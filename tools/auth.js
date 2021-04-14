const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

module.exports = passport => {
    const opts = {
          jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
          secretOrKey: 'secretPassword'
        }

    passport.use(new JwtStrategy(opts, (decode, done) => {
          return done(null, decode);
        }));;
}
