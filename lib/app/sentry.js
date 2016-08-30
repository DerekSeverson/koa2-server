'use strict';

let raven = require('raven'); // Sentry Library
let isUri = require('valid-url').isUri;

let url = process.env.SENTRY_URL;

exports = module.exports = new raven.Client(isUri(url) && url);
