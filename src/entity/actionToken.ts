import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { User } from './user';
import { config } from '../config';
import { CommonFields, ICommonFields } from './commonFields';
import { ActionTokenTypes } from '../enums';

export interface IActionToken extends ICommonFields{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

export interface IActionTokenForSave{
    actionToken: string;
    type: ActionTokenTypes;
    userId: number;
}

@Entity('ActionTokens', { database: config.MYSQL_DATABASE_NAME })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        type: ActionTokenTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
