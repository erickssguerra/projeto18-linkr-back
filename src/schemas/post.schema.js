import Joi from "joi";

export const postSchema = Joi.object({
  url: Joi.string().uri().required(),
  description: Joi.string(),
  hashtagsArray: Joi.array().items(Joi.string()),
});
