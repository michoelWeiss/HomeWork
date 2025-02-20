const pool = require('./pool.js');

module.exports = async (req, res, next) => {
  try {console.log('hello');
    const [results] = await pool.execute('SELECT * FROM cart');

    if (results.length) {
      res.send(JSON.stringify(results));
     // req.session.username = req.body.username;
    }
    next();
  } catch (e) {
    next(e);
  }
};