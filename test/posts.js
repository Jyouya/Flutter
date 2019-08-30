process.env.NODE_ENV = 'test';

const db = require('../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const PORT = process.env.PORT || 8080;

chai.use(chaiHttp);

describe('Create Post', () => {
    it('it should create an post', (done) => {
        const newPost = {
            content :"postblahpostblahpostblah"
        };
        chai.request(server)
            .post('/post')
            .send(newPost)
            .end();
    });
    it('it should create an account', (done) => {
        const newReply = {
            content :"replyblahreplyblahreplyblah"
        };
        chai.request(server)
            .post('/post')
            .send(newReply)
            .end();
    });
})