'use strict';

let logger = require('app/log');
let sentry = require('app/sentry');

exports = module.exports = function () {

  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      try {
        let log = (ctx.log || logger);

        // @todo: Add More Handlers for various Error types.

        if (err.isJoi) {

          ctx.status = 400;
          ctx.body = 'Invalid Request';
          log.error({ err }, 'Validation Error');

        } else {

          ctx.status = err.status || 500;
          ctx.body = err.message;
          log.error({ err }, 'Unhandled Error');
          sentry.captureException(err);

        }
      } catch (bad) {

        // If here, there's a bug with how we handle errors in this middleware.

        ctx.status = 500;
        ctx.body = 'Unknown Error';
        logger.fatal('FAILED TO HANDLE ERROR CORRECTLY!!!');
        sentry.captureException(bad);

      }
    }
  };

};
