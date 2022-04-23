import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config';
import { constants, emailActionEnum, emailInfo } from '../constants';

class EmailService {
    async sendEmail(userEmail: string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
        const templateRenderer = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: constants.FRONTEND_URL });

        const html = await templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'No Replay HomeWork',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
