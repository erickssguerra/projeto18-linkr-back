export function validateBody(schemaParam, parameter) {
  return validate(schemaParam, "body", parameter);
}

export function validateParams(schemaParam, parameter) {
  return validate(schemaParam, "params", parameter);
}

function validate(schema, type, parameter) {
  return (req, res, next) => {
    const { error } = schema.validate(req[type], { abortEarly: false });

    if (error) {
      const erros = error.details.map((detail) => detail.message);
      return res.status(422).send(erros);
    }

    res.locals[parameter] = req[type];
    next();
  };
}
