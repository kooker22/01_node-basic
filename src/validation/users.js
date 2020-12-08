const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const createUserSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["net", "com", "ua"] },
  }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  subscription: Joi.string().optional()
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, "")}`,
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateCreateUser = (req, res, next) => {
  return validate(createUserSchema, req.body, next);
};
