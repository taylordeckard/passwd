const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body')();
const serve = require('koa-static');
const logger = require('./logger');
const koaLogger = require('koa-bunyan')(logger);
const {
	login,
	register,
	reset: {
		initReset,
		applyReset,
	},
	user: {
		createUser,
		getUser,
		updateUser,
	},
} = require('./routes');
const constants = require('./constants');
const { setUser } = require('./middleware');

const app = new Koa();

app.use(koaBody);
app.use(koaLogger);
app.keys = constants.appKeys;

// route definitions
router.post('/api/login', login)
	.post('/api/register', register)
	.put('/api/reset', applyReset)
	.post('/api/reset', initReset)
	.get('/api/user', setUser, getUser)
	.post('/api/user', createUser)
	.put('/api/user', setUser, updateUser);

app.use(router.routes());

// serve static files
app.use(serve(`${__dirname}/public`));

logger.info('ENVIRONMENT: ', process.env.NODE_ENV);

app.listen(3000);
