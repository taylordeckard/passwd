const constants = require('../constants');
const crypto = require('crypto');
const redis = require('../db');
const { Mailer, Templates } = require('../mailer');
const utils = require('../utils');

/**
 * Route to initialize resetting a user's password
 * @param {Context} ctx
 */
module.exports = {
	async applyReset (ctx) {
		const { token, password } = ctx.request.body;
		const tokenRecord = await redis.client.get(token);
		if (!tokenRecord) {
			ctx.throw(404, 'reset token not found');
		}
		const { email } = tokenRecord;
		const user = await redis.client.get(utils.getRedisUserKey(email));
		user.password = utils.encrypt(password);

		await redis.client.set(utils.getRedisUserKey(email), user);
		redis.client.del(token);

		ctx.body = { email };
	},
	async initReset (ctx) {
		const { email } = ctx.request.body;
		const user = await redis.client.get(utils.getRedisUserKey(email));

		if (!user) {
			ctx.throw(404, 'No user with provided email');
		}

		const token = crypto.randomBytes(constants.tokenLength).toString('hex');
		await redis.client.set(token, {
			email,
		}, 'EX', constants.resetPasswordTokenExpiry);

		Mailer.send(email, {
			body: Templates.loadVerifyEmailTemplate({
				token,
				url: utils.getConstant('resetPasswordBaseUrl'),
			}),
			subject: constants.resetPasswordSubject,
		});

		ctx.body = { email };
	},
};
