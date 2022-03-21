import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    res.json(users);
    // const users = await getManager().getRepository(User).findOne({
    //     where: {
    //         firstName: 'Olena',
    //     },
    // });
    // const users = await getManager().getRepository(User).findOne();
    // console.log(users);
    // res.json(users);
    // const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    // res.json(users);
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .where('user.firstName = "Jaha"')
    //     .getOne();
    //
    // console.log(users);
    // res.json(users);
});

app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await getManager().getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(createdUser);
});

app.delete('/users/:id', async (req, res) => {
    const createdUser = await getManager()
        .getRepository(User)
        .delete({ id: Number(req.params.id) });
    res.json(createdUser);
});

const { PORT } = process.env;

app.listen(PORT, async () => {
    console.log(`Server has started!!!! on Port:${PORT} `);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
