// This file is used for sending the pages
async function route(fastify, object) {
  fastify.get('/', async (req, reply) => {
    fastify.mongodb(({ db, client }) => {
      db.collection('promotions').find({ name: 'slider' }).project({_id: 0 , photos: 1}).toArray(async (err, arr) => {
        fastify.checkError(err);
        reply.view('index', { header: await fastify.header({ req: req }) , slides: arr[0]});
        client.close();
      });
    });
  });
}

module.exports = route;