import express from 'express';
const router = express.Router();
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import LoggedInOnlyMiddleware from '../LoggedInOnlyMiddleware.js';

const postSchema = Joi.object({
  title: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  body: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

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
  .post(LoggedInOnlyMiddleware, async (req, res, next) => {
    /*if (!req.session.username) {
      const error = new Error('You must be logged in to add a post');
      error.statusCode = 401;
      return next(error);
    }*/

    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
      //const error = new Error('Valid username and password are required');
      error.statusCode = 422;
      return next(error);
    }

    req.body.date = new Date();
    req.body.author = req.session.username;

    try {
      const result = await req.posts.insertOne(req.body);

      console.log(result);

      req.io.emit('post', req.body);

      res.status(201)
        //.location(`/${req.body._id}`)
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

router.post('/:id/comments', /*LoggedInOnlyMiddleware,*/ async (req, res, next) => {
  req.body.date = new Date();
  req.body.author = req.session.username;
  try {
    const result = await req.posts.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { comments: req.body } });
    console.log(result);

    req.io.emit('comment', req.body);

    res.status(201)
      //.location
      .send(req.body);
  } catch (e) {
    next(e);
  }
});

export default router;
