const fs = require('fs');
const path = require('path');
const constants = require('../constants');

const idxPath = path.resolve(__dirname, '..', constants.indexPath);

/**
 * Serves public/index.html if file not found
 * @param {Context} ctx
 * @param {Promise} next
 */
module.exports = async (ctx, next) => {
	await next();
	if (!/^\/api/.test(ctx.path) && ctx.status === 404) {
		ctx.status = 200;
		ctx.type = 'text/html; charset=utf-8';
		ctx.body = fs.readFileSync(idxPath, 'utf-8');
	}
};
