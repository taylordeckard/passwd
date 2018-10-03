const _ = require('lodash');
const redis = require('../db');
const constants = require('../constants');
const User = require('../classes/User');
const utils = require('../utils');

module.exports = async (ctx, next) => {
	const passwdCookie = ctx.cookies.get(constants.cookieName);
	const userRecord = await redis.client.get(utils.getRedisCookieKey(passwdCookie));

	if (!userRecord) {
		ctx.throw(401, 'not logged in');
	}

	ctx.state.user = new User(_.omit(userRecord, 'password'));
	redis.client.expire(utils.getRedisCookieKey(passwdCookie), constants.cookieExpiry);
	next();
};
