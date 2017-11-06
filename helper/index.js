var bcrypt = require('bcrypt');
var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// response structure

function responseStructure(err, data) {
    var responseObject = {};
    if (err) {
        responseObject.isSucess = false;
        responseObject.data = {};
        responseObject.error = err;
    } else {
        responseObject.isSucess = true;
        responseObject.data = data;
    }
    return responseObject;
}


// get toke from url;
var getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};


// encrypt password 
function encryptPassword(user) {
    // var user = this;    
    var promise = new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
            	reject("Somethings went wrong please try again later");
                // res.status(500).send(responseStructure("Somethings went wrong please try again later"));
            } else {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                    	reject("Somethings went wrong please try again later");
                        // res.status(500).send(responseStructure("Somethings went wrong please try again later"));
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
    return promise;
}

module.exports = {
    'responseStructure': responseStructure,
    'getToken': getToken,
    'encryptPassword': encryptPassword,
    'emailRegex':emailRegex    
}