import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware, authValidatorMiddlewares } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', authValidatorMiddlewares.login, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/forgotPassword', authMiddleware.checkValidEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', authMiddleware.checkValidPassword, authMiddleware.checkActionToken, authController.setPassword);

export const authRouter = router;
