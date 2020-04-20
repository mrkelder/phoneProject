const fastify = require('fastify')();
const path = require('path');
// Basic modules

fastify.decorate('checkError', (err, condition = null) => {
    return new Promise((res, rej) => {
        const assert = require('assert');
        try {
            assert.equal(err, condition);
        }
        catch (err) {
            return rej(err);
        }
        res('Everything went right');
    }).catch(err => {
        console.error("\x1b[30m\x1b[41m" , err.message);
        console.log("\x1b[0m" ,'');
    });
});

fastify.decorate('mongodb', func => {
    // Decoration for mongodb (available everywhere in the project)
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;
    const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

    client.connect(err => {
        checkError(err);
        const db = client.db('PhoneShop');
        func({
            mongodb: mongodb,
            db: db,
            client: client
        });
    });
});

fastify
    .register(require('fastify-static'), {
        root: path.join(__dirname, 'static'),
        prefix: '/'
    })
    .register(require('fastify-cookie'))
    .register(require('point-of-view'), {
        engine: {
            pug: require('pug')
        },
        templates: 'templates',
        includeViewExtension: true
    })
    .register(require('fastify-formbody'))
    .ready(err => {
        fastify.checkError(err).then(() => {
            console.log('Availalbe at http://localhost:8080');
        })
    });
    

fastify.get('/', (req, reply) => {
    reply.send('Hello world!');
});

fastify.listen(8080);