// This file is used for sending the pages
async function route(fastify, object) {
    fastify.get('/', async (req, reply) => {
        reply.view('index', { header: await fastify.header({ req : req }) });
    });
}

module.exports = route;