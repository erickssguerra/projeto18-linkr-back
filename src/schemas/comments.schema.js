import Joi from "joi";

export const commentSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  post_id: Joi.number().integer().required(),
  comment: Joi.string().required(),
});
