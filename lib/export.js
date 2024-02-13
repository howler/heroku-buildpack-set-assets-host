var path = require('path');
var fs = require('fs');

function getEnvVariable(name) {
  return process.env[name] || fs.readFileSync(path.join(process.env.ENV_DIR, name), {encoding: 'utf8'});
}

try {
  var AWS_STATIC_BUCKET_NAME = getEnvVariable('AWS_STATIC_BUCKET_NAME');
  var AWS_STATIC_PREFIX = getEnvVariable('AWS_STATIC_PREFIX');

} catch(error) {
  console.error('Set Assets Host is not configured for this deploy');
  console.error(error);
  console.error('Exiting without error');
  process.exit(0);
}

var SOURCE_VERSION = (process.env.SOURCE_VERSION || '').slice(0, 7);
var STATIC_PATH = path.join(AWS_STATIC_PREFIX, getEnvVariable('HEROKU_APP_NAME'), new Date().toISOString().split('T')[0], SOURCE_VERSION);

fs.writeFileSync(
  path.join(profiled, '00-set-assets-host-export-env.sh'),
  'echo EXPORTING STATIC ENV VARIABLES\n' +
  'export STATIC_SERVER=${STATIC_SERVER:-' + AWS_STATIC_BUCKET_NAME + '.s3.amazonaws.com' + '}\n' +
  'export STATIC_PATH=${STATIC_PATH:-/' + STATIC_PATH + '}\n' +
  'export ASSETS_HOST=${ASSETS_HOST:-https://' + AWS_STATIC_BUCKET_NAME + '.s3.amazonaws.com/' + STATIC_PATH + '}\n',
  {encoding: 'utf8'}
);

process.exit(0);
