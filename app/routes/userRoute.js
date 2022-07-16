import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { authLevel, validateBody } from '../middlewares/index.js';
import { createUserValidationRules } from '../middlewares/validation.js';
const router = express.Router();

router.use(authLevel(['admin']));

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUserValidationRules, validateBody, createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;
