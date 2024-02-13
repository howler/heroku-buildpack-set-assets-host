# Purpose

Uploads static assets to S3 when building Heroku apps.

Requires the NodeJS buildpack to be installed. `https://github.com/heroku/heroku-buildpack-nodejs`


# Setting Mandatory Environment Variables for Build

Important all environmental variables must be set. 
There are no defaults the values below are the suggested values.

```
AWS_STATIC_BUCKET_NAME=<s3-bucket-name>
# prefix to include in path
AWS_STATIC_PREFIX=static
```

# Exported Environment Variables to Runtime

```sh
STATIC_SERVER=<AWS_STATIC_BUCKET_NAME>.s3.amazonaws.com
STATIC_PATH=/<AWS_STATIC_PREFIX>/<HEROKU_APP_NAME>/<YYYY-MM-DD>/<git-commit-sha1>
```

These variables can be overriden with config vars as expected

```
heroku config:set STATIC_SERVER=your.cdn.host
```

To return to the default value just unset the config vars

```
heroku config:unset STATIC_SERVER
```
