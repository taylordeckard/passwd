const _ = require('lodash');
const { promisify } = require('util');
const redis = require('redis');
const User = require('./classes/User');

/**
 * jsonify the response body on redis get
 * @param {Function} fn
 * @returns {Function}
 */
const jsonifyResponse = fn => async (...args) => {
	const response = await fn(args);
	try {
		return JSON.parse(response);
	} catch (e) {
		return response;
	}
};

/**
 * Stringify the request body on redis set
 * @param {Function} fn
 * @returns {Function}
 */
const stringifyRequest = fn => (...args) => {
	try {
		_.set(args, '[1]', JSON.stringify(_.get(args, '[1]')));
	} catch (e) {
		// it's ok
	}
	return fn(args);
};

/**
 * DB Connection Class
 */
class RedisDB {
	/**
	 * Create the redis client
	 */
	constructor () {
		this.client = redis.createClient({ host: 'redis' });
		this.client.get = jsonifyResponse(promisify(this.client.get).bind(this.client));
		this.client.set = stringifyRequest(promisify(this.client.set).bind(this.client));
		this.client.del = promisify(this.client.del).bind(this.client);
	}
	/**
	 * Gets a user given a username
	 * @param {string} username
	 * @returns {User}
	 */
	async getUser (username) {
		const userRecord = await this.client.get(`user:${username}`);
		return userRecord ? new User(userRecord) : null;
	}
}

module.exports = new RedisDB();
