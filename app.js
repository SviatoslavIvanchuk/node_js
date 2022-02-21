const express = require('express');
const {engine} = require('express-handlebars');

const path = require("path");

let users = [];
let error = '';
let user;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/notFound', (req, res) => {
    res.render('notFound', {error});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/user', (req, res)=> {
    res.render('userPage', {user})
})

app.get('/users', (req, res) => {
    const {age, city} = req.query;

    let filterUsers = [...users];
    if (age) {
        filterUsers = filterUsers.filter(user => user.age === age);
    }
    if (city) {
        filterUsers = filterUsers.filter(user => user.city.toLowerCase() === city.toLowerCase());
    }
    if (age && city) {
        filterUsers = filterUsers.filter(user => user.city.toLowerCase() === city.toLowerCase() && user.age === age);
    }

    res.render('users', {users: filterUsers});
});

app.get('/user/:id', (req, res)=> {
    const {id} = req.params;
    let userId = id-1;
    let userByID = [];

    userByID.push(users.find(user => users.indexOf(user).toString() === userId.toString()));
        if (users.length <= userId) {
            error = `User with ID: ${id} not Found!`
            res.render('notFound', {error});
            return;
        }

    res.render('userPage', {user: userByID});
});

app.post('/login', ({body}, res) => {
    const {email} = body;

    let userCheck = [...users]
    userCheck = userCheck.filter(user => user.email.toLowerCase() === email.toLowerCase());
    if (!email || userCheck.length) {
        error = 'Email exists!';
        res.redirect('/notFound' );
        return;
    }

    users.push({...body, id: users.length+1});
    res.redirect('/users');
});

app.post('/signin', ({body}, res) => {
    user = [...users].filter(user => user.email === body.email && user.password === body.password);

    if (user.length !== 1) {
        error = 'User not Found! Check your email or password!'
        res.redirect('/notFound')
        return;
    }
    console.log(user);
    res.redirect(`/user/${user[0].id}`)
});

app.get('/delete/:id', (req, res)=> {
    users = users.filter(user => user.id !== +req.params.id);
    res.redirect('/users');
})

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Server has started in PORT 5200');
});