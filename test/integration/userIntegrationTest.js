
var faker = require('faker');
faker.locale = "pt_BR";
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

const userModel = require("../../src/models/user");

describe('User Integration Test', () => {

    require('../../src/config/db');
    
    const defaultUser = {
        email : "email@email.com",
        password : "1234",
        name : "Marcus tester"
    };

    beforeEach(done => {
        userModel.deleteMany({}, (e2,s2) => {
            new userModel(defaultUser).save((err, user) => {
                done();
            })
        })
    });

    describe('POST /v1/user', () => {
        it('should return 200', done => {

            const anotherUser = {
                email : "email2@email.com",
                password : "2222",
                password2 : "2222",
                name : "Marcus tester 2"
            };

            request
            .post('/v1/user')
            .type('form')
            .send(anotherUser)
            .set('Accept', /application\/json/)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.name).to.be.equal(anotherUser.name);
                expect(res.body.email).to.be.equal(anotherUser.email);
                expect(res.body.password).to.be.equal(anotherUser.password);
                done();

            });
        });
    });

    describe('POST /v1/user/sign-in', () => {
        it('should return 200', done => {

            request
            .post('/v1/user/sign-in')
            .type('form')
            .send(defaultUser)
            .set('Accept', /application\/json/)
            .end((err, res) => {

                expect(res.body).to.be.a('object');
                expect(res.body).to.has.property("token");
                done();

            });

        });
    });

    describe('POST /v1/users', () => {
        it('should return 200', done => {

            request
            .post('/v1/users')
            .type('form')
            .send()
            .set('Accept', /application\/json/)
            .end((err, res) => {
                expect(res.body).to.be.a('array');
                expect(res.body).to.has.length(1);
                done();
            });
            
        });
    });

});