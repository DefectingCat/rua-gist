import Validator, { ValidationSchema } from 'fastest-validator';

const v = new Validator();

export const compile = <T = any>(
  schema: ValidationSchema<T> | ValidationSchema<T>[]
) => {
  return v.compile(schema);
};
