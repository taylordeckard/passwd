const fs = require('fs'),
	_ = require('lodash'),
	path = require('path'),
	logger = require('../logger'),
	handlebars = require('handlebars'),
	rootDir = path.resolve(__dirname, '..'),
	templateDir = path.resolve(rootDir, 'mailer', 'templates');

const templatePaths = {
	base: path.resolve(templateDir, 'base-template.html'),
	partials: {
		loadVerifyEmailTemplate: path.resolve(templateDir, 'verify-email-template.html'),
		loadResetPasswordTemplate: path.resolve(templateDir, 'reset-password-template.html'),
	},
};

const htmlTemplates = {};
let baseTemplate;
// read in the html template files
try {
	baseTemplate = fs.readFileSync(templatePaths.base, 'utf-8');
	_.forOwn(templatePaths.partials, (value, key) => {
		htmlTemplates[key] = fs.readFileSync(value, 'utf-8');
	});
} catch (e) {
	logger.error('Failed to read email template files');
}

// register the base partial
handlebars.registerPartial('base', baseTemplate);

// export the compiled templates
_.forOwn(htmlTemplates, (value, key) => {
	module.exports[key] = handlebars.compile(value);
});
