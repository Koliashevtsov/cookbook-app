const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content)
}

module.exports.register = function (req, res) {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if(!name || !email || !password){
        return sendJsonResponse(res, 400, {
            message: 'All fields are required'
        });
    }
    const user = new User();
    user.name = name;
    user.email = email;
    user.setPassword(password);
    user.save(err => {
        if(err) return sendJsonResponse(res, 404, err);
        const token = user.generateJwt();
        return sendJsonResponse(res, 200, {
            token: token
        });
    })
}

module.exports.login = function (req, res) {
    const { name, email, password } = req.body;
    if(!name, !email, !password){
        return sendJsonResponse(res, 400, {
            "message": "All fields are required"
        });
    }
    passport.authenticate('local', function (err, user, info) {
        if(err) return sendJsonResponse(res, 404, err);
        if(user){
            const token = user.generateJwt();
            return sendJsonResponse(res, 200, {
                token: token
            });
        } else {
            return sendJsonResponse(res, 401, info);
        }
    })(req, res);
}




















////
