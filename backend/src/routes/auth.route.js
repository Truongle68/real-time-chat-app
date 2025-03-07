import express from 'express';
import { loginController, logoutController, signUpController, updateProfileController } from '../controllers/auth.controller.js';
import { authenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUpController)

router.post('/login', loginController)

router.get('/logout', logoutController)

router.post('/update-profile', authenticated, updateProfileController)

export default router;  