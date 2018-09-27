
var faker = require('faker');
faker.locale = "pt_BR";
const jwt = require('jsonwebtoken');

const userModel = require("../../src/models/user");
const userController = require("../../src/controllers/userController");

describe('User Integration Test', () => {

    require('../../src/config/db');
    
    beforeEach(done => {
        userModel.deleteMany({}, (e2,s2) => {
            done();
        })
    });

    describe('POST /v1/user', () => {
        it('should return 422', done => {
            req = res = {};
            userController.getAll(req,res).then((v) => {
                console.log(v)
            })
        });
    });

});