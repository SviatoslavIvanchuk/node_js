import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getUserPagination(): Promise<IPaginationResponse<IUser>>
}
