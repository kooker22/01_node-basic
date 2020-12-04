const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');
const idContactSchema = Joi.object({
  id: Joi.string().alphanum().min(24).max(24).required(),
});

const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp('[a-zA-Z]{2,20}\\s[a-zA-Z]{2,20}'))
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['net', 'com', 'ua'] },
  }),
  phone: Joi.string()
    .pattern(
      new RegExp(
        '^\\(380\\)[0-9]{3}\\-[0-9]{2}\\-[0-9]{2}|\\+\\(380\\)[0-9]{3}\\-[0-9]{2}\\-[0-9]{2}'
      )
    )
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
  token: Joi.string().min(0).optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp('[a-zA-Z]{2,20}\\s[a-zA-Z]{2,20}'))
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['net', 'com', 'ua'] },
  }),
  phone: Joi.string()
    .pattern(
      new RegExp(
        '^\\(380\\)[0-9]{3}\\-[0-9]{2}\\-[0-9]{2}|\\+\\(380\\)[0-9]{3}\\-[0-9]{2}\\-[0-9]{2}'
      )
    )
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
  token: Joi.string().min(0).optional(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(createContactSchema, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(updateContactSchema, req.body, next);
};
module.exports.validateIdContact = (req, res, next) => {
  return validate(idContactSchema, req.params, next);
};
