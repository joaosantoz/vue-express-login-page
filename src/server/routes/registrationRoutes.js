import express from 'express';
import { createUser } from '../controllers/registrationController.js';
import { registrationFieldsValidation } from '../middleware/registrationMiddleware.js';

const router = express.Router();

router.post(
  '/registration',
  registrationFieldsValidation,
  createUser,
);

export default router;
