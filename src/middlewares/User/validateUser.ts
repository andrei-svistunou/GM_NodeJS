import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

const validator = createValidator({
  passError: true
});

const newUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)')).required(),
  age: Joi.number().integer().min(4).max(130).required()
});

interface NewUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  }
}
export type TValidatedRequest = ValidatedRequest<NewUserSchema>;
const validateNewUser = validator.body(newUserSchema);

export default validateNewUser;
