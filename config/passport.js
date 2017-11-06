var jwtStrategy = require('passport-jwt').Strategy,
  extractJwt = require('passport-jwt').ExtractJwt;
// load up the user model
var User = require('../app/user/user.model.js');
var config = require('../config/database'); // get db config file
 
module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest =extractJwt.fromAuthHeaderWithScheme('jwt')
  passport.use(new jwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};