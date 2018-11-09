const constants = require('../constants');
const crypto = require('crypto');
const redis = require('../db');
const { Mailer, Templates } = require('../mailer');
const utils = require('../utils');

module.exports = async (ctx) => {
	const { email, password } = ctx.request.body;

	// check if user exists
	if (await redis.client.get(utils.getRedisUserKey(email))) {
		ctx.throw(409, 'email taken');
	}
	const token = crypto.randomBytes(constants.tokenLength).toString('hex');
	await redis.client.set(token, {
		password: utils.encrypt(password),
		email,
	}, 'EX', constants.verifyEmailTokenExpiry);

	Mailer.send(email, {
		body: Templates.loadVerifyEmailTemplate({
			token,
			url: utils.getConstant('verifyEmailBaseUrl'),
		}),
		subject: constants.verifyEmailSubject,
	});

	ctx.body = { email };
};
