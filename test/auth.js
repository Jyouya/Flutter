process.env.NODE_ENV = 'test';

const db = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const PORT = process.env.PORT || 8080;

chai.use(chaiHttp);

describe('Authorization', () => {
    // Empty the database
    before((done) => {
        db.sequelize.sync({force: true}).then(() => {
            server.listen(PORT);
        }).then(done)
    });

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

        it('it should fail to login with an incorrect password', (done) => {
            const credentials = {
                email: "cowboy@hat.emoji",
                password: "AsDfQwErTy"
            };
            chai.request(server)
                .post('/api/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Email or Password is incorrect');
                    done();
                });
        });

        let token;
        it('it should be able to login to the account with the right password', (done) => {
            const credentials = {
                email: "cowboy@hat.emoji",
                password: "Asdfqwerty",
            };
            chai.request(server)
                .post('/api/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string');
                    token = res.body;
                    done();
                });
        });

        it('it should authenticate the user with the jwt', (done) => {
            chai.request(server)
                .post('/api/authtest')
                .send({jwt: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Hello 🤠');
                    done();
                });
        })
    });
})