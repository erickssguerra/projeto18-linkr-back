import Joi from "joi";

export const hashtagParamSchema = Joi.object({
  hashtag: Joi.string().trim().required(),
});
