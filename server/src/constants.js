module.exports = {
	appKeys: ['<<APP_TEMP_KEY>>'],
	cookieExpiry: 180, // 180s / 60s = 3min
	cookieName: 'passwdCookie',
	crypto: {
		strategy: 'aes-256-cbc',
		key: '<<CRYPTO_TEMP_KEY>>',
	},
	env: {
		development: {
			verifyEmailBaseUrl: 'http://localhost:4200/account/verify/',
		},
		production: {
			verifyEmailBaseUrl: 'https://www.taylordeckard.me/passwd/account/verify/',
		},
	},
	mailerCfg: {
		auth: {
			pass: '<<MAILER_TEMP_PASS>>',
			user: 'admin@taylordeckard.me',
		},
		host: 'mail.privateemail.com',
	},
	redisKey: {
		cookie: 'cookie',
		user: 'user',
	},
};
