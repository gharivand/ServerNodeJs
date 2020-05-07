import httpServer from 'http';

httpServer.createServer();
import {port, env, socketUrl, socketPort} from './config';

import server from './server';
// const database = require('./database');
import scheduler from './scheduler';
// const {
//     createAdmin, counter,
// } = require('./bootstrap');

// const socket = require('./socket');

// global.io = require('socket.io').listen(httpServer);

// socket.init();

// database.connect();

server.listen(port, () => {
    scheduler(server);
    console.info(`Server started on port ${port} (${env})`);

    // createAdmin();
    // counter();
});

// httpServer.listen(socketPort, socketUrl, () => {
//     console.info(`Socket server started on ${socketUrl}:${socketPort}(${env})`);
// });

module.exports = server;
