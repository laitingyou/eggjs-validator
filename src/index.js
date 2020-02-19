'use strict';
const schema = require('async-validator').default;
const rules = require('validator');
// 自定义校验器，优化返回和校验规则，兼容旧语法
module.exports= () => {
  return async (ctx, next) => {
    ctx.rules = rules;
    ctx.validator = async function(descriptor, body) {
      if (typeof descriptor === 'string') {
        const paths = descriptor.split('.');
        descriptor = require(`../../../app/rules/${paths[0]}`)[paths[1]];
      }
      const validator = new schema(descriptor);
      try {
        await validator.validate(body, { first: true, ctx });
        return true;
      } catch (e) {
        throw new Error(e.message || e.errors[0].message);
      }

    };
    await next();
  };
};
