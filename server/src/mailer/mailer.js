const nodemailer = require('nodemailer'),
	logger = require('../logger.js'),
	{ mailerCfg } = require('../constants'),
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
			port: 465,
			auth: mailerCfg.auth,
		};
		this.isProd = process.env.NODE_ENV === 'production';
		if (this.isProd) {
			logger.info('Mailer transporter initialized...');
			this.transporter = nodemailer.createTransport(this.options);
		}
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
			from: `"passwd"<${mailerCfg.auth.user}>`,
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
