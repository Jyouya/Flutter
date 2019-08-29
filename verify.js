const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const jwtVerifyP = promisify(jwt.verify);
const requestIp = require('request-ip');
const db = require('./models')

// Takes a JWT and http request as input.
// Outputs a promise of use {userId, type} or throws an error if authentication fails.
// Catch error with .catch()
module.exports =  async function verify(token, req) {
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