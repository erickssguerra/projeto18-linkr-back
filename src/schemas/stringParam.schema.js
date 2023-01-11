import Joi from "joi";

export const stringParamSchema = Joi.object({
  string: Joi.string().trim().required(),
});