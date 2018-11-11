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
			resetPasswordBaseUrl: 'http://localhost:4200/account/reset/',
			verifyEmailBaseUrl: 'http://localhost:4200/account/verify/',
		},
		production: {
			resetPasswordBaseUrl: 'https://www.taylordeckard.me/passwd/account/reset/',
			verifyEmailBaseUrl: 'https://www.taylordeckard.me/passwd/account/verify/',
		},
	},
	indexPath: 'public/index.html',
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
	resetPasswordSubject: 'Passwd - Reset your master password',
	resetPasswordTokenExpiry: 600, // 10 minutes
	tokenLength: 256,
	verifyEmailSubject: 'Passwd - Verify your Email',
	verifyEmailTokenExpiry: 172800, // 2 days
};
