'use strict';

var SimpleCtrl = exports = module.exports = function SimpleCtrl() {

  // self invoking
  if (!(this instanceof SimpleCtrl)) {
    return new SimpleCtrl();
  }

};

SimpleCtrl.prototype.ping = function (ctx) {

  ctx.body = 'pong';
};

SimpleCtrl.prototype.error = function (ctx) {

  ctx.throw('KNOWN ERROR', 400);
};
