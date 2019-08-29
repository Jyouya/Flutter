process.env.NODE_ENV = 'test'

const db = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Authorization', () => {
    // Empty the database
    before((done) => {
        db.User.destroy({
            where: {},
            truncate: true
        }).then(done);
    });

    describe('Create Account', () => {
        it('it should create an account', (done) => {
            const newUser = {
                username: "🤠",
                password: "Asdfqwerty",
                email: "cowboy@hat.emoji"
            }
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Account creation successful');
                });
        });
    });
})