const pool = require('./pool.js');

module.exports = async (req, res, next) => {
  try {
    // of course dont store real passwords in db. We will fix...
    const [results] = await pool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password]);

    if (results.length) {
      console.log('logged in');
      req.session.username = req.body.username;

      return res.redirect('/admin');
    }

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};
