var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

router.use(async (req, res, next) => {
  const client = new MongoClient(uri);
  const database = client.db('blog');
  req.posts = await database.collection('posts');

  next();
});


/* GET home page. */
router.get('/', async (req, res, next) => {
  const posts = await req.posts.find().toArray();
  res.render('layout',
    {
      subtitle: 'Posts',
      posts,
      partials: {
        content: 'index'
      }
    });
});

router.get('/addPost', (req, res, next) => {
  res.render('layout',
    {
      subtitle: 'Add Post',
      partials: {
        content: 'addPost'
      }
    });
});
router.post('/addPost', async (req, res, next) => {
  try {
    if (req.body.title && req.body.body) {
      req.body.Auther = 'John Smith';
      req.body.date = new Date();
      await req.posts.insertOne(req.body);
      res.end('inserted');
    }
    else {
      res.end('no content');
    }
  }
  catch (e) {
    res.end(`there was an error ${e}`);
  }
});

router.get('/api', async (req, res, next) => {
  try {
    const posts = await req.posts.find().toArray();
    res.end(JSON.stringify(posts));
  }
  catch (e) {
    res.end(`there was an error ${e}`);
  }
});
router.post('/api', async (req, res, next) => {
  try {
    if (req.body.title && req.body.body) {
      req.body.Auther = 'John Smith';
      req.body.date = new Date();
      await req.posts.insertOne(req.body);
      res.end('inserted');
    }
    else {
      res.end('no content');
    }
  }
  catch (e) {
    res.end(`there was an error ${e}`);
  }


});

module.exports = router;
