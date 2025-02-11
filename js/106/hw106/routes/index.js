var express = require('express');
var router = express.Router();

/* GET home page. */
router.use((req, res, next)=> {
  let visited = req.cookies.visited ? JSON.parse(req.cookies.visited) : 0;
  visited++;
  res.locals.visited = visited;
  res.cookie('visited', JSON.stringify(visited));
  next();
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
  
});
router.get('/profile', function(req, res, next) {
  let name = req.cookies.name ? JSON.parse(req.cookies.name) : "";
  name = req.query.name || name || "";
  res.cookie('name', JSON.stringify(name));
  res.locals.name = name;
  res.render('profile');
});


module.exports = router;
