'use strict';

let Router = require('koa-router');

// Base Router

let router = new Router();

router.use(require('koa-bodyparser')());

// Action Examples

router.get('/ping', require('api/actions/ping'));

router.get('/error', require('api/actions/error'));

// Controller Examples

var ctrl = require('api/controllers/simple-ctrl')();

router.post('/ping', ctrl.ping);

router.post('/error', ctrl.error);

// Parse Request Body (POST/Form Data)

var api = new Router();

router.use('/api', api.routes()/*, api.allowedMethods()*/);

exports = module.exports = router;
