import { body } from 'express-validator';

export const loginValidationRules = [
  body('username').exists(),
  body('password').exists(),
];

export const refreshTokenValidationRules = [body('refreshToken').exists()];

export const createUserValidationRules = [
  body('name').exists(),
  body('isAdmin').exists().isBoolean(),
  body('username').exists(),
  body('password').exists(),
];
