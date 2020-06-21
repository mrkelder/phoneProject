// This file is used for sending the pages
async function route(fastify, object) {
  fastify.get('/', async (req, reply) => {
    fastify.mongodb(({ db, client }) => {
      db.collection('promotions').find({ name: { $in: ['slider', 'top_items'] } }).project({ _id: 0, photos: 1, array: 1 }).toArray(async (err, arr) => {
        fastify.checkError(err);
        const slider = arr[0];
        const top_items = arr[1];
        reply.view('index', { header: await fastify.header({ req: req }), slides: slider, top_items: top_items });
        client.close();
      });
    });
  });
}

module.exports = route;