const Joi = require("joi");

const userValidate = (data) => {
  schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

module.exports = userValidate;
