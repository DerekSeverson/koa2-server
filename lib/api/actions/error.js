'use strict';

exports = module.exports = function error(ctx) {

  ctx.throw('KNOWN ERROR', 400);
};
