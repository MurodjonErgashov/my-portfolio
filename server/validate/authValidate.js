const Joi = require("joi");

const authValidate = (date) => {
  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(date, schema);
};
module.exports = authValidate;
