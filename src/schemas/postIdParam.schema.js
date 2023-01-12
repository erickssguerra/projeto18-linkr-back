import Joi from "joi";

export const postIdParamSchema = Joi.object({
  post_id: Joi.number().integer().required(),
});
