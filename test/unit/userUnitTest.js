
const faker = require('faker');
faker.locale = "pt_BR";
const jwt = require('jsonwebtoken');

const userModel = require("../../src/models/user");
const userRepository = require("../../src/repository/userRepository");
const should = require('chai').should();
const expect = require('chai').expect;

describe('User Unit Test', () => {

    require('../../src/config/db');
    
    var req,res;

    const defaultUser = {
        email : "email@email.com",
        password : "1234",
        name : "Marcus tester"
    };

    beforeEach(done => {
        userModel.deleteMany({}, (e2,s2) => {
            done();
        })
    });

    describe('userRepository.storeUser', () => {
        it('should return an user object', done => {

            const user = defaultUser

            userRepository.storeUser(user).then((dt) => {

                expect(dt).to.be.a('object');
                expect(dt.name).to.be.equal(user.name);
                expect(dt.email).to.be.equal(user.email);
                expect(dt.password).to.be.equal(user.password);
                done();

            })
        });
    });

    describe('userRepository.getUserByEmail', () => {
        it('should return an user object', done => {

            new userModel(defaultUser).save((err, user) => {
                userRepository.getUserByEmail(user).then((dt) => {
                    expect(dt).to.be.a('object');
                    expect(dt.email).to.be.equal(user.email);
                    done();
                })
            })
            
        });
    });

    after(() => {
        
    })

});