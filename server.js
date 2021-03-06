/* global config, logger, LOGGER_TYPE */

import http, { createServer } from 'http';
import socketIo from 'socket.io';

import App from './app';
import sockets from './bootstrap/sockets';

class Server {
    constructor(app) {
        const server = http.Server(app);
        const port = config.app.port;
        const host = config.app.host;
        const url = (config.app.env === 'production')
            ? config.app.url
            : `${config.app.url}:${port}`;
        
        // Socket configuration
        const io = socketIo(server);
        sockets(io);

        server.listen(port, host, () => {
            logger(`Server listening on ${url}, Ctrl+C to stop`, LOGGER_TYPE.INFO);
        });

        return server;
    }
}

export const server = new Server(App());
