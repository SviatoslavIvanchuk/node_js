import cron from 'node-cron';
import { userRepository } from '../repositories';

export const getNewUsers = async () => {
    cron.schedule('*/30 * * * * *', async () => {
        console.log('START WORK WITH GET NEW USERS');
        const newUsers = await userRepository.getNewUsers();

        console.log('______________________________');
        console.log(newUsers);
        console.log('______________________________');
    });
};
