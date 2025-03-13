const TestRouter = require('./TestRouter');
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
}

module.exports = routes;