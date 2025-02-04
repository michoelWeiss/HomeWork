import express from 'express';
const router = express.Router();
import pool from '../pool.js';
import debugLib from 'debug';
const debug = debugLib('contacts:api');


/* GET home page. */
/**/
router.get('/contacts', (req, res, next) => {
  res.writeHead(301, {
    location: '/contacts.html'
  });
  res.end();
});

router.use(async (req, res, next) => {
  req.statCode = 200;
  req.successMessage = { success_status: 'Success' };
  next();
});

router.get('/contacts-api', async (req, res, next) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM contacts'
    );

    if (!results.length) {
      req.statCode = 404;
      req.successMessage.success_status = 'Could not find contacts';
    }
    results.unshift(req.successMessage);
    res.status(req.statCode).send(results);

  } catch (err) {
    next(err);
  }
});



router.get('/contacts-api/:id', async (req, res, next) => {
  try {
    const [results] = await pool.execute(
      'SELECT * FROM contacts WHERE id = ?', [req.params.id]
    );
    if (!results.length) {
      req.statCode = 404;
      req.successMessage.success_status = `Could not find ID# ${req.params.id}`;
    }

    results.unshift(req.successMessage);
    res.status(req.statCode).send(results);

  } catch (err) {
    next(err);
  }
});

export default router;
