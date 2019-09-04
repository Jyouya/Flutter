const axios = require('axios');
https = require('https');

const agent = axios.create({
    withCredentials: false,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

async function makeUsers() {
    await agent.post('https://localhost:8443/api/users', { username: '👩', email: '1@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '👩🏿', email: '2@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '⌚', email: '3@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '💞', email: '4@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '💛', email: '5@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '📯', email: '6@test.test', password: 'Asdfqwerty' });
    await agent.post('https://localhost:8443/api/users', { username: '🎀', email: '7@test.test', password: 'Asdfqwerty' });
}

module.exports = makeUsers().then(() => console.log('done'))