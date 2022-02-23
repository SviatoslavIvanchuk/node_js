const users = require('../db/users');
let user;
let error = '';

class userController {
    renderUser (req, res) {
        res.render('userPage', {user})
    }
    findUser (req, res) {
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
    }
}

module.exports = new userController();