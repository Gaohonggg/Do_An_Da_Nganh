const TestRouter = require('./TestRouter');
const AuthRouter = require('./AuthRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
}

module.exports = routes;