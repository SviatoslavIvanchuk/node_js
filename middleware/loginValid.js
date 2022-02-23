let error = '';

function loginValid(req, res, next) {
    try {
        const { firstName, lastName, email, password, age, city } = req.body;

        if (!email || !password || !firstName || !lastName || !age || !city) {
            throw new Error('All fields must be not empty');
        }

        if (password.length < 6) {
            throw new Error('Not valid password')
        }

        next();
    } catch ({message}) {
        error = message;
        console.log(message)
        res.status(400).render('notFound', {error})
    }
}

module.exports = loginValid;