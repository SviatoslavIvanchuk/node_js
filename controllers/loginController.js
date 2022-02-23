const users = require('../db/users')
let error = '';

class loginController {
    renderLogin (req, res) {
        res.render('login');
    }
    redirectUsers ({body}, res) {
        const {email} = body;

        let userCheck = [...users]
        userCheck = userCheck.filter(user => user.email.toLowerCase() === email.toLowerCase());
        if (!email || userCheck.length) {
            error = 'Email exists!';
            res.render('notFound', {error});
            return;
        }

        users.push({...body, id: users.length+1});
        res.redirect('/users');
    }
}

module.exports = new loginController();