const expect = require('chai').expect;
const regex = require('../emoji-validation-regex');

describe('Emoji Validation', function() {
    it("should return truthy on a string of all emoji", function() {
        expect(regex.exec('⌚👩👩🏿↔️')).to.be.ok;
    });

    it("should return falsey on a string with no emoji", function() {
        expect(regex.exec('a string with no emoji')).to.be.not.ok;
    });

    it("should return falsey on a string containing some non emoji", function() {
        expect(regex.exec('a string with one 👩 emoji')).to.be.not.ok;
    });

    it("should return falsey on an empty string", function() {
        expect(regex.exec('')).to.be.not.ok;
    });
})