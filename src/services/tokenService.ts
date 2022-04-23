import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IToken } from '../entity';
import { tokenRepository } from '../repositories';
import { ITokenPair, IUserPayload } from '../interfaces';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

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
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ accessToken, refreshToken, userId });
    }

    public async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    public verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(
            payload,
            config.SECRET_ACTION_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACTION },
        );
    }
}

export const tokenService = new TokenService();
