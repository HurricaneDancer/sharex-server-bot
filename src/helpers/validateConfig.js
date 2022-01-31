const Joi = require("joi");

const schema = Joi.object({
  botToken: Joi.string().required(),
  authedUsers: Joi.array()
    .items(
      Joi.object({
        discordID: Joi.string().required(),
        assToken: Joi.string().required(),
      })
    )
    .min(1),
  uploadChannel: Joi.string().required().min(18),
  baseURL: Joi.string().regex(
    new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    )
  ),
  assHeaders: Joi.object(),
});

module.exports = function (config) {
  const result = schema.validate(config);
  if (result.error) throw result.error;
};
