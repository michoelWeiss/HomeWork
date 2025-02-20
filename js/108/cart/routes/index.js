var express = require('express');
var router = express.Router();
const pool = require('../pool.js');
var session = require('express-session')

router.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false
}));

router.post('/addToCart', async function (req, res, next) { 
  try {
    const category = req.query.category || 'all';
    const id = req.query.id;
    const quantity = Number(req.query.quantity);
    if (id && quantity) {
      const [results] = await pool.execute('SELECT * FROM cart WHERE id = ?', [id]);
      if (results.length) {
        const selectedItem = results[0];
        if (!req.session.shopping_Cart) { req.session.shopping_Cart = []; }
        let cart = req.session.shopping_Cart;
        let flag = false;
        cart.forEach(item => {
          if (item.item.id === selectedItem.id) {
            item.quantity += quantity;
            item.totalPrice = item.quantity * Number(selectedItem.price);
            flag = true;
          }
            
        });
        if (!flag) {
          cart.push({ quantity, totalPrice: quantity * Number(selectedItem.price), item: selectedItem });
        }
        req.session.shopping_Cart = cart;
       console.log(req.session.shopping_Cart);
      }
      else {
        throw new Error(`Could not find animal`);
      }
    }
    res.redirect(`/?category=${category}`);
  } catch (e) {
    console.log(e);
    res.redirect(`/?category=${category}`);
  }
});

router.route('/cart')
  .get((req, res, next) => {
    let cart = req.session.shopping_Cart;
    let grandTotal = 0;
    cart.forEach(item => {
      grandTotal += item.totalPrice;
    });
    console.log(req.session);
    res.render('layout', {
      itemsInCart: cart || [],
      cartIsFull: cart.length > 0,
      grandTotal: grandTotal || 'Unknown',
      partials: {
        content: 'cart'
      }
    });

  });

router.get('/', async function (req, res, next) {
  try {
    let items = [];
    const [categoryResults] = await pool.execute('SELECT DISTINCT category FROM cart');
    const category = req.query.category;
    if (category && category != 'all') {
      const [results] = await pool.execute('SELECT * FROM cart WHERE category = ? OR category = ?', [category, 'hybrid']);
      items = results;
    }
    else {
      const [results] = await pool.execute('SELECT * FROM cart');
      items = results;
    }

    res.render('layout', {
      title: 'Take home a pet today!',
      items,
      areCategorys: categoryResults.length > 0,
      categoryNames: categoryResults,
      partials: {
        content: 'index'
      }
    });
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;
