// This file is used for retrieving information (not pages)
async function utility(fastify, object) {
    fastify.get('/chooseCity', (req, reply) => {
        // Retrieves information about shops and cities
        const text = /NL shop in \w+/i.test(req.query.text) ? `\"NL shop in ${req.query.text.match(/\w+$/i)}\"` : req.query.text; // Checking for the name of the shop
        fastify.mongodb(({ db, client }) => {
            db.collection('shops').find({
                $text : {
                    $search : text
                }
            }).toArray(async (err , data) => {
                await fastify.checkError(err);
                reply.send(JSON.stringify(data));
                client.close();
            });
        });
    });
}

module.exports = utility;