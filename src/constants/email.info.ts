import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to SEP-2021',
        templateName: 'welcome',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'You Account was blocked',
        templateName: 'account Blocked',
    },

    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'You Forgot Password',
        templateName: 'forgotPassword',
    },
};
