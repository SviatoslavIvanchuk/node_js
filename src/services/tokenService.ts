import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IToken } from '../entity/token';
import { tokenRepository } from '../repositories/token/tokenRepository';

class TokenService {
    public async generateTokenPair(payload: any):
        Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string, accessToken: string)
        : Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ accessToken, refreshToken, userId });
    }
}

export const tokenService = new TokenService();
