const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body')();
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
router.post('/login', login)
	.post('/user', createUser)
	.get('/user', setUser, getUser);

app.use(router.routes());


app.listen(3000);
