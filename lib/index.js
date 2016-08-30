'use strict';

// Load .env into process.env object

require('dotenv').config();

// Debug Setup

let debug = require('debug')('app:startup');
let log = require('app/log');
let sentry = require('app/sentry');

// Send Data to Sentry instead!!

process.on('unhandledRejection', (reason, p) => {
  log.error({ err: reason }, 'Unhandled Rejection');
  sentry.captureException(reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  log.error({ err }, 'Unhandled Exception');
  sentry.captureException(err);
  process.exit(1);
});

// Require Middleware

let bunyan = require('koa-bunyan-logger');
let serve = require('koa-static');
let router = require('api/routes');
let errors = require('api/middleware/errors');

// Create Koa & Socket.io Server

let Koa = require('koa');
let app = new Koa();
let server = require('http').createServer(app.callback()); // <-- in-case we want to attach other listeners to the same http server

// Error Handler Middleware

app.use(errors());

// Logging Middleware Setup

app.use(bunyan(require('app/configs/bunyan')));
app.use(bunyan.requestIdContext());
app.use(bunyan.requestLogger());
app.use(bunyan.timeContext());

// Service Static Files Middleware Setup

app.use(serve('../public'));

// API Router Middleware Setup

app.use(router.routes());
//app.use(router.allowedMethods());

// Listen for Error Events

// app.on('error', function (err, ctx) {
//
// });

// Start the Server!

debug('Starting Server');

server.listen(process.env.PORT);

debug('Started Server');
