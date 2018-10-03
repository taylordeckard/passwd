module.exports = {
	appKeys: ['<change_this_in_production>'],
	cookieExpiry: 180, // 180s / 60s = 3min
	cookieName: 'passwdCookie',
	redisKey: {
		cookie: 'cookie',
		user: 'user',
	},
	crypto: {
		strategy: 'aes-256-cbc',
		key: '<change_this_in_production>',
	},
};
