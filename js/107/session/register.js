const pool = require('./pool.js');
const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const userInput = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    const value = await userInput.validateAsync({username: req.body.username, password: req.body.password });
    console.log(value);
    const [usernameCheckresults] = await pool.execute('SELECT * FROM users WHERE username = ?', [value.username]);

    if (!usernameCheckresults.length) {
      const [results] = await pool.execute('INSERT INTO users (username, password) VALUES (?,?)',
        [value.username, value.password]);

      if (results.affectedRows) {
        return res.redirect('/');
      }
    }

    return res.status(400).render('register', { error: 'That username is already taken. Please choose another one.' });

  } catch (err) {
    console.log(err.details[0].message);
    return res.status(400).render('register', { error: err.details[0].message });
  }
};