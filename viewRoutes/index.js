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

//this is login page
router.get('/forgetpassword', function (req, res, next){
	res.render('forgetpassword', { title: 'FIFA FANS' });
});

//this is change password page
router.get('/changepassword', function (req, res, next){
	res.render('changepassword', { title: 'FIFA FANS' });
});

//this is about user page
router.get('/aboutuser', function (req, res, next){
	res.render('aboutuser', { title: 'FIFA FANS' });
});

//this is contact info page
router.get('/usercontactinfo', function (req, res, next){
	res.render('usercontactinfo', { title: 'FIFA FANS' });
});

//this is profile page
router.get('/profile', function (req, res, next){
	res.render('profile', { title: 'FIFA FANS' });
});

//this is profile page
router.get('/forgetpass_verification', function (req, res, next){
	res.render('forgetpass_verification', { title: 'FIFA FANS' });
});

//this is readnews page
router.get('/readnews', function (req, res, next){
	res.render('readnews', { title: 'FIFA FANS' });
});

//this is message page
router.get('/message', function (req, res, next){
	res.render('message', { title: 'FIFA FANS' });
});

//this is message page
router.get('/room', function (req, res, next){
	res.render('room', { title: 'FIFA FANS' });
});

//this is message page
router.get('/roommessagebox', function (req, res, next){
	res.render('roommessagebox', { title: 'FIFA FANS' });
});

//this is message page
router.get('/news', function (req, res, next){
	res.render('news', { title: 'FIFA FANS' });
});

module.exports = router;
