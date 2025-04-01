var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect("/shop");
});

router.get('/error', function(req, res, next) {
  let message = req.params.message;
  console.log(req.query.status);
  let error = {
    status: req.query.status,
    stack: req.query.stack,
  }
  console.log(error);
  res.render("error.twig", {message: message, error: error});
})

module.exports = router;
