import express from 'express';
import { body } from 'express-validator';
import {
  getMyProfile,
  login,
  refreshToken,
} from '../controllers/authController.js';
import { authLevel, validateBody } from '../middlewares/index.js';
import {
  loginValidationRules,
  refreshTokenValidationRules,
} from '../middlewares/validation.js';
const router = express.Router();

router.post('/login', loginValidationRules, validateBody, login);
router.post('/token', refreshTokenValidationRules, refreshToken);
router.get('/me', authLevel(['admin', 'user']), getMyProfile);
export default router;
