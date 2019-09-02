const verify = require('../verify');
const authorizer = {};
const scopes = {
    default: {
        default: {

        }
    }
};

authorizer.register = function (route, userTypes, methods = ['GET'], options = {}) {

    scopes[route] = scopes[route] || {};
    userTypes.forEach(type => {
        scopes[route][type] = scopes[route][type] || {};
        methods.forEach(method => {
            scopes[route][type][method] = true;
        });
    });
    if (options.ignore) {
        scopes[route].ignore = true;
    }
}


authorizer.mw = async function (req, res, next) {
    if (scopes[req.path] && scopes[req.path].ignore) {
        next();
        return;
    }

    let scope;
    if (!req.cookies.jwt) {
        scope = (scopes[req.path] || scopes.default).default || {};// (route | default route).default user | user with no permissions

        // Unauthorized and not logged in
        if (!scope[req.method]) {
            res.redirect('/login');
            return;
        }
    } else {
        let user;
        try {
            user = await verify(req.cookies.jwt, res);// returns id and type
        } catch (err) { // user has a jwt cookie, but it can't be verified.  Direct them to login
            // console.log(err);
            res.redirect('/login');
            return;
        }
        // console.log(user.userId);
        req.userId = user.userId; // attach user id to 
        req.userType = user.type; // in case an endpoint wants it.

        let scopePath;
        if (scopes[req.path]) {
            scopePath = scopes[req.path];
        } else {
            const fallback = req.path.replace(/([A-Za-z_\-+0-9]+)$/, ':');
            scopePath = scopes[fallback] || scopes.default;
        }

        scope = scopePath[user.type] || scopePath.default;

        // Unauthorized and logged in
        if (!(scope && scope[req.method])) {
            // console.log(req.path);
            res.status(403).end();
            return;
        }

    }
    // Request is authorized!  send it forward
    // console.log(req.url, req.method)
    next();
}

module.exports = authorizer;