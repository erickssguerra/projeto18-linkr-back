import Joi from "joi";

export const postSchema = Joi.object({
  userId: Joi.number().required(),
  description: Joi.string(),
  url: Joi.string().uri().required(),
  hashtagsArray: Joi.array().items(Joi.string()),
});
