const _ = require('lodash');
const redis = require('../db');
const utils = require('../utils');

module.exports = {
	async createUser (ctx) {
		const { username, password } = ctx.request.body;

		// check if user exists
		if (await redis.client.get(utils.getRedisUserKey(username))) {
			ctx.throw(409, 'username taken');
		}

		await redis.client.set(utils.getRedisUserKey(username), {
			password: utils.encrypt(password),
			username,
		});

		ctx.body = username;
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
