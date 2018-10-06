const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body')();
const serve = require('koa-static');
const logger = require('./logger');
const koaLogger = require('koa-bunyan')(logger);
const {
	login,
	user: {
		createUser,
		getUser,
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
	.post('/api/user', createUser)
	.get('/api/user', setUser, getUser);

app.use(router.routes());

// serve static files
app.use(serve(`${__dirname}/public`));

app.listen(3000);
