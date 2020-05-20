// This file is used for retrieving information (not pages)
async function utility(fastify, object) {

  const { telegram } = object;

  fastify.get('/chooseCity', (req, reply) => {
    // Retrieves information about shops and cities
    const text = /NL shop in \w+/i.test(req.query.text) ? `\"NL shop in ${req.query.text.match(/\w+$/i)}\"` : req.query.text; // Checking for the name of the shop
    fastify.mongodb(({ db, client }) => {
      db.collection('shops').find({
        $text: {
          $search: text
        }
      }).toArray(async (err, data) => {
        await fastify.checkError(err);
        reply.send(JSON.stringify(data));
        client.close();
      });
    });
  });

  fastify.get('/findItem', (req, reply) => {
    // Searches for items and gives array of them
    fastify.mongodb(({ db, client }) => {
      db.collection('items').find({
        $text: {
          $search: req.query.itemName
        }
      }).limit(5).toArray(async (err, arr) => {
        await fastify.checkError(err);
        reply.send(JSON.stringify(arr));
        client.close();
      });
    });
  });

  fastify.get('/sendPhoneToRecall', async (req, reply) => {
    // Sends messages to the telegram group
    await telegram.sendMessage({ chat_id: '-1001350737400', text: `Горячая линия: ${req.query.number}` });
    reply.send('Мы перезвоним вам в ближайшее время');
  });
}

module.exports = utility;