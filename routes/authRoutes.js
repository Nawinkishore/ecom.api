import express from 'express';
import { authController } from '../controllers/index.js';
const router = express.Router();
router.post("/register",authController.register);
export default router;