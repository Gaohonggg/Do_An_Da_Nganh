const TestRouter = require('./TestRouter');
const AuthRouter = require('./AuthRouter');
const UserRouter = require('./UserRouter');
const LightRouter = require('./LightRouter');
const FanRouter = require('./FanRouter');
const DoorRouter = require('./DoorRouter');

const routes = (app) => {
    app.use('/test', TestRouter);
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);
    app.use('/light', LightRouter);
    app.use('/fan', FanRouter);
    app.use('/door', DoorRouter);
}

module.exports = routes;