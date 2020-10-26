'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const Relish = require('relish')();

const init = async () => {
    const server = new Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            cors: true,
            validate: {
                failAction: Relish.failAction,
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
