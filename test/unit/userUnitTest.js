
const faker = require('faker');
faker.locale = "pt_BR";
const jwt = require('jsonwebtoken');

const userModel = require("../../src/models/user");
const userRepository = require("../../src/repository/userRepository");
const should = require('chai').should();
const expect = require('chai').expect;

describe('User Unit Test', () => {

    require('../../src/config/db');
    
    beforeEach(done => {
        userModel.deleteMany({}, (e2,s2) => {
            done();
        })
    });

    describe('POST /v1/user', () => {
        it('should return an user object', done => {

            const user = {
                email : "email@email.com",
                password : "1234",
                name : faker.name.findName().toUpperCase()
            };

            userRepository.storeUser(user).then((dt) => {

                expect(dt).to.be.a('object');
                expect(dt.name).to.be.equal(user.name);
                expect(dt.email).to.be.equal(user.email);
                expect(dt.password).to.be.equal(user.password);
                done();

            })
        });
    });

    after(() => {
        
    })

});