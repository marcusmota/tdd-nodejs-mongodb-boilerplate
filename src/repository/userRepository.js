
const userModel = require("../../src/models/user");

exports.storeUser = (obj) => {

    return new Promise((resolve) => {
        return new userModel(obj).save((err, dt) => {
            resolve(dt);
        })
    })

};