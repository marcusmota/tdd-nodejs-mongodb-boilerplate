
const userRepository = require("./../repository/userRepository")
const jwt = require("jsonwebtoken");

const getAll = (req, res) => {

    let query = {};

    if(req.query.name){
        query['name'] = new RegExp(req.query.name, "ig");
    }

    if(req.query.email){
        query['email'] = new RegExp(req.query.email, "ig");
    }

    userRepository.getAllUser(query).then((dt) => {
        res.send(dt)
    })
};


const post = (req, res) => {

    req.checkBody({
        'email' : {
            notEmpty:{
                errorMessage: 'the field email is required'
            }
        },
        'name' : {
            notEmpty: {
                errorMessage: 'the field name is required'
            }
        },
        'password' : {
            notEmpty:{
                errorMessage: 'the field password is required'
            },
            isLength: {
                options: [{ min: 2, max: 8 }],
                errorMessage: 'Put a password with length between 2 and 8'
            } 
        },
        'password2' : {
            notEmpty: {
                errorMessage: 'the field password confirmation is required'
            }
        }
    })

    req.checkBody("password").equals(req.body.password2).withMessage("The passwords don't match");

    req.asyncValidationErrors().then(function() {
        userRepository.storeUser(req.body).then((dt) => {
            res.send(dt)
        })

    }).catch(function(errors) {
        if(errors) {
            res.status(422).send(errors, 422);
        }
    });
};

const signIn = (req, res) => {
    req.checkBody({
        'email' : {
            notEmpty:{
                errorMessage: 'the field email is required'
            }
        },
        'password' : {
            notEmpty:{
                errorMessage: 'the field password is required'
            },
            isLength: {
                options: [{ min: 2, max: 8 }],
                errorMessage: 'Put a password with length between 2 and 8'
            } 
        }
    })

    req.asyncValidationErrors().then(function() {

        userRepository.getUserByEmail(req.body).then((user) => {
            if(user.password == req.body.password){
                res.send({token : jwt.sign({'_id': user._id}, "secret")});
            }
        })

    }).catch(function(errors) {

        if(errors) {
            res.status(422).send(errors, 422);
        }

    });
};

module.exports = { getAll, post, signIn }
