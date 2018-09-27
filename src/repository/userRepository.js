
const userModel = require("../../src/models/user");

exports.storeUser = (obj) => {

    return new Promise((resolve) => {
        return new userModel(obj).save((err, dt) => {
            resolve(dt);
        })
    })

};

exports.getUserByEmail = (obj) => {

    return new Promise((resolve) => {

        userModel
        .findOne({ email: obj.email})
        .select({email : 1, password : 1})
        .then((resp) => {
            if(resp){
                resolve(resp);
            }else{
                reject({msg : "User not found"})
            }
        }).catch((err) => {
            reject({msg : err})
        })
    })

};

exports.getAllUser = (obj) => {

    return new Promise((resolve) => {

        userModel
        .findall(obj)
        .then((resp) => {
            resolve(resp);
        }).catch((err) => {
            reject({msg : err})
        })
    })

};