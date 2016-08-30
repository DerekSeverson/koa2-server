'use strict';

var bunyan = require('bunyan');

exports = module.exports = {
  name: process.env.APP_NAME || 'app',
  level: process.env.LOG_LEVEL || 'info',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'error',
      stream: process.stderr
    }
  ]
};
