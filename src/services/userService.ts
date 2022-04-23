import bcrypt from 'bcrypt';
import { IUser } from '../entity';
import { userRepository } from '../repositories';

class UserService {
    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        const createdUser = await userRepository.createUser(dataToSave);
        return createdUser;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserPagination() {
        return userRepository.getUserPagination({ email: 'lang151@gmail.com' });
    }

    public async updateUser(id: number, obj: Partial<IUser>): Promise<object | undefined> {
        if (obj.password) {
            obj.password = await this._hashPassword(obj.password);
        }

        return userRepository.updateUser(id, obj);
    }

    public async compareUserPasswords(password: string, hash: string): Promise<void | Error> {
        const isPasswordsUnique = bcrypt.compare(password, hash);

        if (!isPasswordsUnique) {
            throw new Error('User not Exists!!!');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
