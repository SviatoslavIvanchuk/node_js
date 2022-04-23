import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { constants } from '../constants';
import { ErrorHandler } from '../error';
import { authValidator } from '../validators';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);
            if (!accessToken) {
                next(new Error('No Token!!!'));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid!!!', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid!!!', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);
            if (!refreshToken) {
                next(new ErrorHandler('No Token!!!', 401));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid!!!', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid!!!', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public checkValidEmail(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkValidPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.password.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
