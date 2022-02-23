const users = require('../db/users');
let error = '';
let user;

class signinController {
    renderSignin (req, res) {
        res.render('signin');
    }
    findUser ({body}, res) {
        user = [...users].filter(user => user.email === body.email && user.password === body.password);

        if (user.length !== 1) {
            error = 'User not Found! Check your email or password!'
            res.redirect('/notFound')
            return;
        }
        res.redirect(`/user/${user[0].id}`);
    }
}

module.exports = new signinController();