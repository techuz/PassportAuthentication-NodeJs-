
var express = require('express');
var router = express.Router();
var passport = require("passport");

var userController = require('./user.controller');


// check user authenticated or not for fetch user data
//api/users/
router.get("/",passport.authenticate('jwt', { session: false}),userController.getUser);  

// signup user  api/users/signup
router.post('/signup', userController.signup);

// login user  api/users/login
router.post('/login', userController.login);

// get userDetails using token
router.get('/me', passport.authenticate('jwt', { session: false}), userController.me);

// forgot password 
router.post('/forgotPassword', userController.forgotPassword);

//change Password using token
router.post("/changePassword", passport.authenticate('jwt', { session: false}),userController.changePassword);
module.exports = router;