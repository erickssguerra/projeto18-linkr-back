import Joi from "joi";

export const followedIdParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
