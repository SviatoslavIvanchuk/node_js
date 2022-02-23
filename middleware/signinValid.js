let error = '';

function signinValid(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('login or password is not provided!');
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

module.exports = signinValid;
