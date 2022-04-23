import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IRequestExtended, ITokenData } from '../interfaces';
import { constants, COOKIE, emailActionEnum } from '../constants';
import { IUser } from '../entity';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { ActionTokenTypes } from '../enums';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendEmail(email, emailActionEnum.WELCOME, { userName: firstName });

            await userService.compareUserPasswords(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);
            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository.createActionToken({ actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id });

            await emailService.sendEmail(email, emailActionEnum.FORGOT_PASSWORD, {
                token,
                userName: firstName,
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        console.log(req.user);
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.updateUser(id, req.body);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
