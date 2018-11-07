const fs = require('fs'),
	_ = require('lodash'),
	path = require('path'),
	logger = require('../logger'),
	handlebars = require('handlebars'),
	rootDir = path.resolve(__dirname, '..');


const htmlTemplates = {};
let baseTemplate;
try {
	baseTemplate = fs.readFileSync(path.resolve(rootDir, 'mailer', 'templates', 'base-template.html'), 'utf8');
	htmlTemplates.loadVerifyEmailTemplate = fs.readFileSync(path.resolve(rootDir, 'mailer', 'templates', 'verify-email-template.html'), 'utf8');
} catch (e) {
	logger.error('Failed to read email template files');
}

// register the base partial
handlebars.registerPartial('base', baseTemplate);

_.forOwn(htmlTemplates, (value, key) => {
	module.exports[key] = handlebars.compile(value);
});

