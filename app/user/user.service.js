var User = require("./user.model.js");
var jwt = require('jwt-simple');
var config = require('../../config/database');
var helper = require("../../helper");
var encryptPassword = helper.encryptPassword;
var getToken = helper.getToken;

function getUser() {
    var promise = new Promise(function(resolve, reject) {
        User.find({}, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
    return promise;
}

function signup(req) {

    var promise = new Promise(function(resolve, reject) {
        // encrypt password
        var passwordPromise = encryptPassword(req.body);
        passwordPromise.then(function(password) {
            var newUser = new User({
                email: req.body.email,
                password: password
            });
            // save the user
            newUser.save(function(err, data) {
                if (err) {
                    reject("Email already exists");
                } else {
                    resolve("User created successfully");
                }
            });
        }, function(rejected) {
            reject(rejected);
        });
    });
    return promise;
}

function login(req) {
    var promise = new Promise(function(resolve, reject) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                reject("Authentication failed. User not found.");
            } else {
                // compare password
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON          				                        
                        resolve({ token: 'JWT ' + token });
                    } else {
                        reject("Authentication failed. Wrong password.");
                    }
                });
            }
        });
    });
    return promise;
}

function me(req) {
    var token = getToken(req.headers);
    var promise = new Promise(function(resolve, reject) {
        if (token) {
            // decode user token
            var user = jwt.decode(token, config.secret);            
            delete user.password;
            resolve(user);            
        } else {
            reject('No token provided.');
        }
    });

    return promise;
}

function forgotPassword(req) {    
    var promise = new Promise(function(resolve, reject) {
    	// find user
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) {
                reject(err);
            }
            if (!user) {
                reject("Authentication failed. User not found.");
            } else {
            	// return token
                var token = jwt.encode(user, config.secret);
                resolve({ token: 'JWT ' + token });
            }
        });
    });
    return promise;
}

function changePassword(req) {
    var promise = new Promise(function(resolve, reject) {
        var token = getToken(req.headers);
        if (token) {
        	// decode token and get emailid
            var decoded = jwt.decode(token, config.secret);
            // check user exist or not
            User.findOne({
                email: decoded.email
            }, function(err, user) {
                if (!user) {
                    reject("Authentication failed. Token not valid")
                } else {
                	// compare old password
                    user.comparePassword(req.body.oldPassword, function(err, isMatch) {
                        if (isMatch && !err) {
                            var data = { 'email': user.email, 'password': req.body.password };
                            // decrypt new password
                            var passwordPromise = encryptPassword(data);                            
                            passwordPromise.then(function(password) {
                            	// update user password 
                                User.update({ 'email': data.email }, { 'password': password }, function(err, user) {
                                    if (err) {
                                        reject("Somethings went wrong please try again later")
                                    } else {
                                        resolve("Password updated successfully");
                                    }
                                });
                            });

                        } else {
                            reject("Password not mathched");
                        }
                    });
                }
            });
        } else {
            reject("No token provided.");
        }
    });
    return promise;
}


module.exports = {
    'getUser': getUser,
    'signup': signup,
    'login': login,
    'me': me,
    'forgotPassword': forgotPassword,
    'changePassword': changePassword
}