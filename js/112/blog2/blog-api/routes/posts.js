import express from 'express';
const router = express.Router();

router.use((req, res, next) => {
  req.posts = req.database.collection('posts');
  next();
});

router.route('/')
  .get(async (req, res, next) => {
    try {
      const thePosts = await req.posts.find().toArray();
      res.send(thePosts);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    req.body.date = new Date();
    req.body.author = 'Donald';

    try {
      const result = await req.posts.insertOne(req.body);

      console.log(result);

      io.emit('post', req.body);

      res.status(201)
        //.location(`/${req.body._id}`)
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

  export default router;
