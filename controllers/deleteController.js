let users = require('../db/users');

class deleteController {
    renderDelete (req, res) {
        users = users.filter(user => user.id !== +req.params.id);
        res.redirect('/users');
    }
}
module.exports = new deleteController();