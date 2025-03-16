import express from 'express';
const router = express.Router();
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import LoggedInOnlyMiddleware from '../LoggedInOnlyMiddleware.js';
import Post from '../models/Post.js';

const postSchema = Joi.object({
  title: Joi.string()
    //.alphanum()
    .min(3)
    .max(30)
    .required(),

  body: Joi.string()
    //.alphanum()
    .min(3)
    .max(3000)
    .required()
});

const commentSchema = Joi.object({
  body: Joi.string()
    //.alphanum()
    .min(3)
    .max(300)
    .required()
});

router.route('/')
  .get(async (req, res, next) => {
    try {
      const thePosts = await Post.find()
        .skip(Number(req.query.skip) ?? 0)
        .limit(Number(req.query.limit) ?? 100);
      res.send(thePosts);
    } catch (e) {
      next(e);
    }
  })
  .post(LoggedInOnlyMiddleware, async (req, res, next) => {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.statusCode = 422;
      return next(error);
    }

    try {
      const post = new Post({
        title: req.body.title,
        author: req.session.username,
        body: req.body.body,
        foo: 5
      });
      await post.save();

      req.io.emit('post', post);

      res.status(201)
        .location(`/${post._id}`)
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: new ObjectId(req.params.id) });
    if (!post) {
      const error = new Error(`Unable to find post ${req.params.id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.send(post);
  } catch (e) {
    next(e);
  }
});

router.route('/:id/comments')
  .get(async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: new ObjectId(req.params.id) });
      if (!post) {
        const error = new Error(`Unable to find post ${req.params.id}`);
        error.statusCode = 404;
        return next(error);
      }

      res.send(post);
    } catch (e) {
      next(e);
    }
  })
  .post(LoggedInOnlyMiddleware, async (req, res, next) => {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.statusCode = 422;
      return next(error);
    }

    req.body.date = new Date();
    req.body.author = req.session.username;
    try {
      /*const result = await Post.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { comments: req.body } });
      console.log(result);

      if (!result.matchedCount) {
        const error = new Error(`Unable to find post ${req.params.id}`);
        error.statusCode = 404;
        return next(error);
      }*/

      const post = await Post.findOne({ _id: new ObjectId(req.params.id) });
      if (!post) {
        const error = new Error(`Unable to find post ${req.params.id}`);
        error.statusCode = 404;
        return next(error);
      }

      post.comments = post.comments || [];
      post.comments.push(req.body);
      post.save();

      req.io.emit('comment', {postId: req.params.id, comment: req.body });

      res.status(201)
        //.location
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

export default router;
