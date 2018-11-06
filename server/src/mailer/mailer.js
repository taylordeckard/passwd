const nodemailer = require('nodemailer'),
	logger = require('../logger.js'),
	mailerCfg = require('../config/mailer-config'),
	_ = require('lodash');

/**
 * Mailer Class
 */
class Mailer {
	/**
	 * Mailer Constructor initializes transporter
	 */
	constructor () {
		this.options = {
			host: mailerCfg.host,
			// host: 'mail.privateemail.com',
			port: 465,
			auth: mailerCfg.auth,
		};
		if (this.isProd) {
			logger.info('Mailer transporter initialized...');
			this.transporter = nodemailer.createTransport(this.options);
		}
		this.isProd = process.env.NODE_ENV === 'production';
	}
	/**
	 * Sends an email
	 * @param {string} recipient
	 * @param {string} content
	 */
	send (recipient, content) {
		if (!this.isProd || !recipient) {
			logger.info('(Email wasn\'t really sent.)');
			return;
		}
		const mailOptions = {
			from: `"passwd"<${mailerCfg.user}>`,
			to: recipient,
			subject: _.get(content, 'subject'),
			html: _.get(content, 'body'),
		};
		this.transporter.sendMail(mailOptions, (error) => {
			if (error) {
				logger.error('error sending email');
				logger.error(error);
			}
		});
	}
}

module.exports = new Mailer();
