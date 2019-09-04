module.exports = function (authorizer) {
    authorizer.register('/login', ['default'], ['GET','POST'], {ignore: true});
    authorizer.register('/logout', ['default'], ['POST']);
    authorizer.register('/register', ['default'], ['GET'], {ignore:true});

    authorizer.register('/register', ['default', 'basic', 'mod', 'admin'], ['GET']);
    authorizer.register('/api/users', ['default', 'admin'], ['POST']); // Account registration
    
    authorizer.register('/', ['default', 'basic', 'mod', 'admin'], ['GET']);
    authorizer.register('/home', ['default', 'basic', 'mod', 'admin'], ['GET']);
    authorizer.register('/profile', ['default', 'basic', 'mod', 'admin'], ['GET']); 
    authorizer.register('/edit-profile', ['default', 'basic', 'mod', 'admin'], ['GET']); 
    
    authorizer.register('/api/posts', ['basic', 'mod', 'admin'], ['POST']);
    authorizer.register('/api/posts', ['default','basic', 'mod', 'admin'], ['GET']);

    authorizer.register('/api/regex', ['default'], ['GET'])
    
    authorizer.register('/api/users', ['default', 'basic', 'mod', 'admin'], ['GET']);
    authorizer.register('/api/users', ['basic', 'mod', 'admin'], ['PUT']);
    authorizer.register('/api/users/me', ['basic', 'mod', 'admin'], ['GET']);
    
    authorizer.register('/api/likes/user/:', ['default', 'basic', 'mod', 'admin'], ['GET']);

    authorizer.register('/check-login', ['default', 'basic', 'mod', 'admin'], ['GET']);
    
    authorizer.register('/api/likes/:', ['basic', 'mod', 'admin'], ['POST']);

    authorizer.register('/api/follows/:', ['basic', 'mod', 'admin'], ['POST']);
    authorizer.register('/api/follows', ['default'], ['GET']);

    // Test routes
    authorizer.register('/api/restrictedtest', ['basic', 'admin'], ['GET']);
    authorizer.register('/api/restrictedtest', ['admin'], ['POST']);
    
    authorizer.register('/api/authtest', ['basic', 'mod', 'admin'], ['GET', 'POST']);

    authorizer.register('/api/trendingtest', ['default'], ['GET']);
    authorizer.register('/api/users/:', ['default'], ['GET']);



    
}