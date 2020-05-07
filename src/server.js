import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import dDos from 'ddos';
import ExpressLogs from 'express-server-logs';

const routes = require('./api/v1/router');
const error = require('./middlewares/error');

import {whitelist, dDosConfig} from './config'
let dDosInstance = new dDos(dDosConfig);

const corsOptions = {
    exposedHeaders: 'authorization, x-refresh-token, x-token-expiry-time',
    origin: (origin, callback) => {
        if (!whitelist || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const server = express();
const xLogs = new ExpressLogs(false);

// npm module for preventing DDos attack. See more https://www.npmjs.com/package/ddos
server.use(dDosInstance.express);

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(xLogs.logger);

// gzip compression
server.use(compress());

// secure servers by setting various HTTP headers
server.use(helmet());

// enable CORS - Cross Origin Resource Sharing
server.use(cors(corsOptions));

// mount api v1 routes
server.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
server.use(error.converter);

// catch 404 and forward to error handler
server.use(error.notFound);

// error handler, send stacktrace only during development
server.use(error.handler);

module.exports = server;
