let emoji = require('emoji-regex')();
emoji = '^(' + emoji.toString().replace(/^\/|\/$/, '') + '| )+$';
module.exports = new RegExp(emoji);