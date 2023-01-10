import Joi from "joi";

export const followerIdParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
