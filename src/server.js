const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = hapi.server({
        port: 9000,
        host: '0.0.0.0',
    });

    server.route(routes);

    await server.start();
};

init();
