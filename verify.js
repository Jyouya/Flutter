const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtVerifyP = promisify(jwt.verify);
const db = require('./models');
const jwtSignP = promisify(jwt.sign);

// Takes a JWT and http request as input.
// Outputs a promise of use {userId, type} or throws an error if authentication fails.
// Catch error with .catch()
module.exports = async function verify(token) {
    // Throws error if token wasn't signed by us.
    const decoded = await jwtVerifyP(token, process.env.JWT_SECRET);

    // Token is expired
    if (decoded.iat * 1000 + 1200000 < new Date().getTime()) {
        // check when the token was last used
        const dbToken = await db.Token.findOne({
            where: {
                id: decoded.tokenId
            }
        });

        // if the user has been inactive, fail authentication
        if (dbToken.updatedAt * 1000 + 1200000 < new Date().getTime()) {
            db.Token.delete({
                where: {
                    id: dbToken.id
                }
            });
            throw "Authentication Failed";
        }

        // Otherwise, we want to issue a new token

        // Updated the last-active time for the token.  Don't need to wait for this.
        db.Token.update({ id: dbToken.id }, {
            where: {
                id: dbToken.id
            }
        });

        // Send the new cookie
        res.cookie('jwt', await jwtSignP(
            {
                userId: decoded.userId,
                tokenId: decoded.tokenId,
                type: decoded.type
            },
            process.env.JWT_SECRET
        ));
    } else { // token is not expired
        // Update the last-active time for the token.  Don't need to wait for this.
        db.Token.update({ id: decoded.tokenId }, {
            where: {
                id: decoded.tokenId
            }
        });
    }

    return {
        userId: decoded.userId,
        type: decoded.type,
    }
}