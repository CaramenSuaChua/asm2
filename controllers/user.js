const User = require('../models/user');

//postUser
exports.postRegUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ name: username }).then(user => {
        if (!user) {
            const newUser = new User({
                name: username,
                password: password,
                // fullName: '',
                // phoneNumber: '',
                // email: '',
                isAdmin: false
            })
            newUser.save();
            res.status(200).send('User created!')
        }
        else {
            res.status(200).send('User existed!')
        }
    })
}

exports.postLoginUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ name: username }).then(user => {
        if (user) {
            if (user.password !== password) {
                res.status(200).send('Wrong Password!')
            }
            else {
                res.status(200).send({
                    message: 'Login Sucessful!',
                    user: user
                })
            }
        }
        else {
            res.status(200).send('User Not Exist!')
        }
    })
}