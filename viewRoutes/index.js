var express = require('express');
var router = express.Router();

/* register all pages */
router.get('/', function (req, res, next){
	res.render('index', { title: 'FIFA FANS' });
});

// this is the about page
router.get('/about', function (req, res, next){
	res.render('about', { title: 'FIFA FANS' });
});

module.exports = router;
