const { promisify } = require('util')
const crypto = require('crypto');
const scryptP = promisify(crypto.scrypt);
const randomBytesP = promisify(crypto.randomBytes);
const jwt = require('jsonwebtoken');
const jwtSignP = promisify(jwt.sign);
const jwtVerifyP = promisify(jwt.verify);
const requestIp = require('request-ip');

const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{8,}/;

module.exports = function (app, db) {
    app.post('/api/login', async function (req, res) {
        const user = await authenticate(req.body.email, req.body.password);
        if (!user) {
            res.status(401).json({ msg: 'Email or Password is incorrect' });
            return;
        };
        const { id } = user;

        // Get uuid for new JWT
        const { id: tokenId } = await db.Token.create({
            UserId: id
        });



        try {
            res.json(await jwtSignP(
                {
                    userId: id,
                    tokenId: tokenId,
                    type: user.type,
                    ip: requestIp.getClientIp(req)
                },
                process.env.JWT_SECRET
            ));
        } catch (err) {
            res.json({ msg: 'Login failed.  Please try again later.' });
        }

        // TODO: When issuing a new token to a user, delete all of their expired tokens from the database
    });

    app.post('/api/users', async function (req, res) {
        let user;
        try {
            user = await await db.User.findOne({
                where: {
                    email: req.body.email
                }
            });
        } catch (err) {
            res.json({ msg: 'Must provide an email address' });
        }

        if (user) {
            res.json({ msg: 'An account with that email already exists' });
        } else {
            try {
                if (!passwordRegExp.exec(req.body.password)) throw 'Password must be at least 8 characters and contain an upper and lowercase letter'
                const salt = await randomBytesP(256);
                const hash = await scryptP(req.body.password, salt, 256);
                await db.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    passHash: hash,
                    salt: salt
                });
                res.json({ msg: 'Account creation successful' })
            } catch (err) {
                // Cases where we expect to catch an error:
                // Username was blank OR
                // Password fails validation
                // Username contains non-emoji
                res.json({ msg: err });
            }
        }
    });
    async function authenticate(email = "", password = "") {
        const user = await db.User.findOne({
            where: {
                email: email
            }
        });
        const salt = await randomBytesP(256);

        if (!user) {
            // Need to perform a dummy hash to make username hits and misses take the same time
            const dummy = await scryptP(password, salt, 256).toString();
            return false;
        }
        const hash = await scryptP(password, user.salt, 256);
        if (hash != user.passHash.toString()) {
            return false;
        }
        return user;
    }
    return async function verify(token, req) {
        // Throws error if token wasn't signed by us.
        const decoded = await jwtVerifyP(token, process.env.JWT_SECRET);

        // Throw an error if the token is not issued to the client making the request.
        if (decoded.ip != requestIp.getClientIp(req)) throw "Authentication Failed";

        // Look up the token in our database.  Throws an error if we don't have a record of it.
        dbToken = await db.Token.findOne({
            where: {
                id: decoded.tokenId
            }
        });


        // Check if the token has expired.  If so, delete it from the db and throw an error
        if (dbToken.updatedAt * 1000 + 1200000 < new Date().getTime()) {
            db.Token.delete({
                where: {
                    id: dbToken.id
                }
            });
            throw "Authentication Failed";
        }

        // Authentication is successful at this point

        // Refresh the timeout on the token
        db.Token.update({ id: dbToken.id }, {
            where: {
                id: dbToken.id
            }
        }).then(async result => {
            const token = await db.Token.findOne({
                where: {
                    id: dbToken.id
                }
            });
        });

        return {
            userId: decoded.userId,
            type: decoded.type,
        }
    }
};
