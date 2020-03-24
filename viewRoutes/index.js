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

// for notification page
router.get('/notification', function (req, res, next){
	res.render('notification', { title: 'FIFA FANS' });
});

// for rooms page
router.get('/rooms', function (req, res, next){
	res.render('rooms', { title: 'FIFA FANS' });
});

// for create room page
router.get('/create_room', function (req, res, next){
	res.render('create_room', { title: 'FIFA FANS' });
});

// for read news
router.get('/readnews', function (req, res, next){
	res.render('readnews', { title: 'FIFA FANS' });
});



module.exports = router;
