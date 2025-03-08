import express from 'express';
import { checkAuthController, loginController, logoutController, signUpController, updateProfileController } from '../controllers/auth.controller.js';
import { authenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUpController)

router.post('/login', loginController)

router.get('/logout', logoutController)

router.get('/check', authenticated, checkAuthController)

router.post('/update-profile/pic', authenticated, updateProfileController)

export default router;  