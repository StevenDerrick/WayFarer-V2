import Joi from 'joi';
import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
  const schema = {
    first_name: Joi.string()
        .min(3)
        .required()
        .error(() => {
            return {
              message: ' First name is required.',
            };
        }),
    last_name: Joi.string()
        .min(3)
        .required()
        .error(() => {
            return {
              message: ' Last name is required.',
            };
        }),
    email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(() => {
            return {
              message: ' Email is required and must be valid.',
            };
        }),
    password: Joi.string()
        .regex(/^[a-zA-Z]\w{3,14}$/)
        .required()
        .error(() => {
            return {
              message: ' Password is required and must have atleast 4 characters to 15, no characters other than letters, numbers and underscore.',
            };
        }),

  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};