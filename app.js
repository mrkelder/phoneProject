const fastify = require('fastify')();
const path = require('path');
// Basic modules
const telegramAPI = require('telegram-bot-api');
const telegram = new telegramAPI({ token: '1090473546:AAHyA_sj6ctqaBZjydOfAxk7s67UTmAK3fY' });
// System modules

fastify.decorate('checkError', (err, condition = null) => {
  // err - object of error
  // condition - condition , that equals to null or something else (null in most cases)
  // this decoration returns promise that you can work with (or do nothing if you don't need)
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
    console.error("\x1b[30m\x1b[41m", err.message);
    console.log("\x1b[0m", '');
  });
});

fastify.decorate('mongodb', func => {
  // Decoration for mongodb (available everywhere in the project)
  const mongodb = require('mongodb');
  const MongoClient = mongodb.MongoClient;
  const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

  client.connect(err => {
    fastify.checkError(err);
    const db = client.db('phoneShop');
    func({
      mongodb: mongodb,
      db: db,
      client: client
    });
  });
});

fastify.decorate('header', async ({ req }) => {
  return { cities: await fastify.cities(), lang: fastify.lang(req), categories: await fastify.categories() };
});

fastify.decorate('cities', () => {
  // Retrieving cities for header (mobile and PC)
  return new Promise(res => {
    fastify.mongodb(({ db, client }) => {
      db.collection('shops').find({}).limit(5).toArray(async (err, arr) => {
        await fastify.checkError(err);
        client.close();
        res(arr);
      });
    });
  })
});

fastify.decorate('lang', req => {
  // Choosing language
  if (req.cookies.lang === undefined || req.cookies.lang === 'ua') {
    return 'ua';
  }
  else {
    return 'ru';
  }
});

fastify.decorate('categories', () => {
  // Creates an array with the categories
  return new Promise(res => {
    fastify.mongodb(({ db, client }) => {
      db.collection('products').find().toArray(async (err, arr) => {
        await fastify.checkError(err);
        client.close();
        res(JSON.stringify(arr));
      });
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
  .register(require(path.join(__dirname, '/server/route.js')))
  .register(require(path.join(__dirname, '/server/utility.js')) , {telegram: telegram})
  .ready(err => {
    fastify.checkError(err).then(() => {
      console.log('Availalbe at http://localhost:8080');
    })
  });

fastify.listen(8080);