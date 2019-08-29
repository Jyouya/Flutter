const { promisify } = require('util');
const crypto = require('crypto');
const scryptP = promisify(crypto.scrypt);
const randomBytesP = promisify(crypto.randomBytes);
const jwt = require('jsonwebtoken');
const jwtSignP = promisify(jwt.sign);
const jwtVerifyP = promisify(jwt.verify);
const requestIp = require('request-ip');
const Op = require('sequelize').Op;

const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{8,}/;

module.exports = function (app, db, authorizer) {

    authorizer.register('/login', ['default'], ['GET','POST'], {ignore: true})
    app.post('/login', async function (req, res) {
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
            // res.json(await jwtSignP(
            //     {
            //         userId: id,
            //         tokenId: tokenId,
            //         type: user.type,
            //         ip: requestIp.getClientIp(req)
            //     },
            //     process.env.JWT_SECRET
            // ));
            res.cookie('jwt', await jwtSignP(
                {
                    userId: id,
                    tokenId: tokenId,
                    type: user.type,
                    ip: requestIp.getClientIp(req)
                },
                process.env.JWT_SECRET
            )).send();
        } catch (err) {
            console.log(err);
            res.json(err);
            // res.json({ msg: 'Login failed.  Please try again later.' });
        }

        // TODO: When issuing a new token to a user, delete all of their expired tokens from the database
    });

    authorizer.register('/api/users', ['default', 'admin'], ['POST']); // Allow users with no permissions to register.  Prevent normal users from creating an account while logged in.
    app.post('/api/users', async function (req, res) {
        let user;
        try {
            user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: req.body.email },
                        { username: req.body.username }
                    ]
                }
            });
        } catch (err) {
            res.json({ msg: 'Must provide an email address and username' });
            return;
        }

        if (user && user.email == req.body.email) {
            res.json({ msg: 'An account with that email already exists' });
        } else if (user && user.username == req.body.username) {
            res.json({ msg: 'An account with that username already exists' })
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
};
