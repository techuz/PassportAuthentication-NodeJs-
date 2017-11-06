var User = require("./user.model.js");
var jwt = require('jwt-simple');
var config = require('../../config/database');
var helper = require("../../helper");
var responseStructure = helper.responseStructure;
var emailRegex = helper.emailRegex;
var userService = require("./user.service");

// get user list
function getUser(req, res) {
    userService.getUser().then(function(resolve) {
        res.status(200).send(responseStructure(null, resolve));
    }, function(reject) {
        res.status(200).send(responseStructure(err));
    })
}

// register user
function signup(req, res) {
    if (!req.body.email || !req.body.password) {        
        res.status(500).send(responseStructure("Please pass email and password."));
    }
    else if(!emailRegex.test(req.body.email)){
    	res.status(500).send(responseStructure("Please enter valid email"));
    }
    else {
        userService.signup(req).then(function(resolve) {
            return res.status(200).send(responseStructure(null, resolve));
        }, function(reject) {
            return res.status(500).send(responseStructure(reject));
        })
    }
}

// login user
function login(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, msg: 'Please pass email and password.' });
    } else {
        userService.login(req).then(function(resolve){
        	return res.status(200).send(responseStructure(null,resolve));
        },function(reject){
        	return res.status(500).send(responseStructure(reject));
        });
    }
}

// get user deatils using token
function me(req, res) {
    userService.me(req).then(function(resolve){    	
    	return res.status(200).send(responseStructure(null,resolve));
    },function(reject){    	
    	return res.status(500).send(responseStructure(reject));
    })
}

// get token if user register
function forgotPassword(req, res) {
    if(!req.body.email){
    	res.status(500).send("please pass email");
    }
    else{
    	userService.forgotPassword(req).then(function(resolve){    		
			return res.status(200).send(responseStructure(null,resolve));
    	},function(reject){    		
    		return res.status(500).send(responseStructure(reject));
    	})
    }
}

// change password using valid token 
function changePassword(req, res) {
    userService.changePassword(req).then(function(resolve){
    	return res.status(200).send(responseStructure(null,resolve));
    },function(reject){
    	return res.status(500).send(responseStructure(reject));
    });
}

module.exports = {
    'getUser': getUser,
    'signup': signup,
    'login': login,
    'me': me,
    'forgotPassword': forgotPassword,
    'changePassword': changePassword
}