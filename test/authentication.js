process.env.NODE_ENV = 'test';

const db = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Authentication and Authorization', () => {
    // Empty the database
    before((done) => {
        new Promise(resolve => server.on("app_started", resolve))
            .then(() => db.Token.destroy({ where: {} }))
            .then(() => db.Like.destroy({ where: {} }))
            .then(() => db.Post.destroy({ where: {} }))
            .then(() => db.User.destroy({ where: {} }))
            .then(() => done());
    });

    //agent will stay logged in
    const agent = chai.request.agent(server);
    const agent2 = chai.request.agent(server);
    after((done) => {
        agent.close();
        agent2.close();
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
                .send({ data: 'dummy' })
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
                .send({ data: 'stuff' })
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

    describe('Making, liking, and replying to posts', () => {

        it('Creating second user', (done) => {
            // Create a second user for later tests
            const user2 = {
                username: "🦩",
                password: "Asdfqwerty",
                email: "flamingo@bird.emoji"
            };
            chai.request(server)
                .post('/api/users')
                .send(user2)
                .end(() => done());
        });

        it('Logging in second user', (done) => {
            credentials2 = {
                email: "flamingo@bird.emoji",
                password: "Asdfqwerty"
            };
            agent2
                .post('/login')
                .send(credentials2)
                .end(() => done());
        });

        let postOneId;
        let postTwoId;
        it('User 1 should be able to create a post', (done) => {
            agent
                .post('/api/posts')
                .send({ content: "🤠🤠🤠" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Post added successfully');
                    postOneId = res.body.postId;
                    done();
                });
        });

        it('User 2 should be able to reply to user 1\'s post', (done) => {
            agent2
                .post('/api/posts')
                .send({ content: "🦩 🦩", replyId: postOneId })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql('Post added successfully');
                    postTwoId = res.body.postId;
                    done();
                });
        });

        it('User 1 should be able to like user 2\'s post', (done) => {
            agent
                .post(`/api/likes/${postTwoId}`)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('msg').eql(`Liked post #${postTwoId}`);
                    done();
                });
        });
    });
});