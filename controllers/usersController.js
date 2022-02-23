const users = require("../db/users");

class usersController {
    renderUsers(req, res) {
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
    }
}

module.exports = new usersController();