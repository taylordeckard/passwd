const _ = require('lodash');
const redis = require('../db');
const utils = require('../utils');

module.exports = {
	async createUser (ctx) {
		const { token } = ctx.request.body;
		const user = await redis.client.get(token);
		if (!user) {
			ctx.throw(400, 'invalid verification token');
		}
		await redis.client.set(utils.getRedisUserKey(user.email), {
			username: user.email,
			password: user.password,
		});
		ctx.body = { email: user.email };
	},
	async getUser (ctx) {
		const username = ctx.state.user.username;
		const redisKey = utils.getRedisUserKey(username);
		ctx.body = _.pick(await redis.client.get(redisKey), 'data');
	},
	async updateUser (ctx) {
		const username = ctx.state.user.username;
		const redisKey = utils.getRedisUserKey(username);
		const dbUser = await redis.client.get(redisKey);
		// update user data
		_.set(dbUser, 'data', _.get(ctx.request.body, 'data'));
		await redis.client.set(redisKey, dbUser);
		ctx.body = 'success';
	},
};
