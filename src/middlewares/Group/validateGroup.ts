import Joi from 'joi';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation';

import { Permissions } from '../../models/Group';

const validator = createValidator({
  passError: true
});

const newGroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()
});

interface NewGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    permissions: Permissions;
  }
}
export type TValidatedRequest = ValidatedRequest<NewGroupSchema>;
const validateGroup = validator.body(newGroupSchema);

export default validateGroup;
