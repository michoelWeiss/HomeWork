import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const router = express.Router();

router.use((req, res, next) => {
  req.users = req.database.collection('users');
  next();
});

router.post('/login', async (req, res, next) => {
  try {
    const result = await req.users.findOne({ username: req.body.username });
    console.log(result);

    if (!result) {
      throw new Error('Bad username or password');
    }

    if (!await bcrypt.compare(req.body.password, result.password)) {
      throw new Error('Bad username or password');
    }

    req.session.username = req.body.username;

    res.status(204).end();
  } catch (e) {
    e.statusCode = 401;
    next(e);
  }
});

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      //const error = new Error('Valid username and password are required');
      error.statusCode = 422;
      return next(error);
    }

    const hash = await bcrypt.hash(password, 10);

    const results = await req.users.insertOne({
      username: req.body.username,
      password: hash
    });

    console.log(results);

    res.statusCode = 201;
    res.end();
  } catch (e) {
    console.log(e);

    if (e.code === 11000) {
      return next(new Error(`${username} is already taken. Please try a different one.`));
    }

    next(e);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(204).end();
});

export default router;
