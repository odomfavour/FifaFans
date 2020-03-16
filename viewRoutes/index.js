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

//this is the signup page

router.get('/signup', function (req, res, next){
	res.render('signup', { title: 'FIFA FANS' });
});

//this is login page
router.get('/login', function (req, res, next){
	res.render('login', { title: 'FIFA FANS' });
});


//this is login page
router.get('/editprofile', function (req, res, next){
	res.render('editprofile', { title: 'FIFA FANS' });
});

module.exports = router;
