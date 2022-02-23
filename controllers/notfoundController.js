let error = '';

class notfoundController {
    renderNotFound (req, res) {
        res.render('notFound', {error});
    }
}

module.exports = new notfoundController();