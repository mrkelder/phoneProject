const fastify = require('fastify')();

fastify.get('/' , (req , reply) => {
    reply.send('Hello world!');
});

fastify.listen(8080);