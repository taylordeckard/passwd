const crypto = require('crypto');
const constants = require('../constants');
const redis = require('../db');
const utils = require('../utils');

module.exports = async (ctx) => {
	let username, password;
	try {
		username = ctx.request.body.username;
		password = ctx.request.body.password;
	} catch (e) {
		ctx.throw(400, 'missing username and/or password');
	}
	// look up user
	const user = await redis.getUser(username);

	if (user && password === utils.decrypt(user.password)) {
		ctx.body = { loggedIn: true };
		const passwdCookie = crypto.randomBytes(64).toString('hex');
		ctx.cookies.set(constants.cookieName, passwdCookie, { signed: true });
		await redis.client.set(
			utils.getRedisCookieKey(passwdCookie), user, 'EX',
			constants.cookieExpiry,
		);
	} else {
		ctx.throw(401, 'invalid credentials');
	}
};
