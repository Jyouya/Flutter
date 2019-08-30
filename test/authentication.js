process.env.NODE_ENV = 'test';

const db = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const PORT = process.env.PORT || 8080;

chai.use(chaiHttp);

describe('Authentication and Authorization', () => {
    // Empty the database
    before((done) => {
        db.Token.destroy({ where: {} }).then(() => {
            db.User.destroy({ where: {} }).then(() => {
                done();
            });
        });
    });

    const agent = chai.request.agent(server);
    after((done) => {
        agent.close();
        done();
    })

    describe('Create Account', () => {
        it('it should create an account', (done) => {
            const newUser = {
                username: "🤠",
                password: "Asdfqwerty",
                email: "cowboy@hat.emoji"
            };
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Account creation successful');
                    done();
                });
        });

        it('it should prevent creation of an account with a duplicate username', (done) => {
            const newUser = {
                username: "🤠",
                password: "qwertyasdF",
                email: "emoji@cowboy.hat"
            };
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('An account with that username already exists');
                    done();
                });
        });

        it('it should prevent creation of an account with a duplicate email', (done) => {
            const newUser = {
                username: "🤒",
                password: "zxcvbnmYUIOP",
                email: "cowboy@hat.emoji"
            };
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('An account with that email already exists');
                    done();
                });
        });
    });

    describe('Login to Account', () => {
        it('it should fail to login with an incorrect password', (done) => {
            const credentials = {
                email: "cowboy@hat.emoji",
                password: "AsDfQwErTy"
            };
            agent
                .post('/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Email or Password is incorrect');
                    done();
                });
        });

        it('it should be able to login to the account with the right password', (done) => {
            const credentials = {
                email: "cowboy@hat.emoji",
                password: "Asdfqwerty",
            };
            agent
                .post('/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.cookie('jwt');
                    done();
                });
        });

        it('it should authenticate the user with the jwt', (done) => {
            agent
                .post('/api/authtest')
                .send({ data: 'dummy'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Hello 🤠');
                    done();
                });
        });
    });

    describe('Authorization', () => {
        it('it should be able to GET /api/restrictedtest as a basic user', (done) => {
            agent
                .get('/api/restrictedtest')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('You got the thing!');
                    done();
                });
        });

        it('it should be unable to POST /api/restrictedtest as a basic user', (done) => {
            agent
                .post('/api/restrictedtest')
                .send({data: 'stuff'})
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
})