const crypto = require('crypto');
const constants = require('./constants');

module.exports = {
	decrypt (encryptedText) {
		const decipher = crypto.createDecipher(constants.crypto.strategy, constants.crypto.key);
		let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	},
	encrypt (plainText) {
		const cipher = crypto.createCipher(constants.crypto.strategy, constants.crypto.key);
		let encrypted = cipher.update(plainText, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
	},
	getRedisUserKey (username) {
		return `${constants.redisKey.user}:${username}`;
	},
	getRedisCookieKey (cookie) {
		return `${constants.redisKey.cookie}:${cookie}`;
	},
	getConstant (key) {
		return constants.env[process.env.NODE_ENV][key];
	},
};
