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

module.exports = function (app, db) {
    app.post('/login', async function (req, res) {
        try {
            const user = await authenticate(req.body.email, req.body.password);
            await login(res, req.body.email, req.body.password);
            res.send();
        } catch (err) {
            res.status(400).json({msg: err})
        }
    });

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
            res.status(400).json({ msg: 'Must provide an email address and username' });
            return;
        }

        if (user && user.email == req.body.email) {
            res.status(400).json({ msg: 'An account with that email already exists' });
        } else if (user && user.username == req.body.username) {
            res.status(400).json({ msg: 'An account with that username already exists' })
        } else if (!passwordRegExp.exec(req.body.password)) {
            res.status(400).json({ msg: 'Password must be at least 8 characters and contain an upper and lowercase letter'})
        } else {
            try {
                const salt = await randomBytesP(256);
                const hash = await scryptP(req.body.password, salt, 256);
                await db.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    passHash: hash,
                    salt: salt
                })
                await login(res, req.body.email, req.body.password);
                res.json({ msg: 'Account creation successful'})
            } catch (err) {
                // Cases where we expect to catch an error:
                // Username was blank OR
                // Password fails validation
                // Username contains non-emoji
                res.status(400).json({ msg: err });
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

    async function login(res, email, password) {
        const user = await authenticate(email, password);
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
            res.cookie('jwt', await jwtSignP(
                {
                    userId: id,
                    tokenId: tokenId,
                    type: user.type
                },
                process.env.JWT_SECRET
            ));
        } catch (err) {
            console.log(err);
            res.json(err);
            return;
            // res.json({ msg: 'Login failed.  Please try again later.' });
        }
    }
};
