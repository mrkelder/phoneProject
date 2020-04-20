async function route(fastify , object){

    fastify.get('/', (req, reply) => {
        reply.view('index');
    });

}

module.exports = route;