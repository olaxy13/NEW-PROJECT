// the below all come from the JWT library
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require('./keys');



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            //console.log('jwt-payload', jwt_payload)
            User.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        return 'Contact the Admin for support'
                    }
                }).catch((e) => {
                    return done(null, false);

                })
                .catch((err) => console.log(err));
        })
    );
};





































const passport = require('passport');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
//const facebookStrategy = require('passport-facebook').Strategy;
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//const TwitterStrategy = require('passport-twitter').Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
    done(null, user);
});

//Google strategy
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    }, (request, accessToken, refreshToken, profile, done) => {
        console.log(profile)
        done(null, profile)
    }));
}
//facebook strategy
// module.exports = (passport) => {
//     passport.use(new facebookStrategy({

//         // pull in our app id and secret from our auth.js file
//         clientID: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_SECRET_ID,
//         callbackURL: "http://localhost:3000/facebook/callback",
//         profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

//     },// facebook will send back the token and profile
//         function (token, refreshToken, profile, done) {

//             console.log(profile)
//             return done(null, profile)
//         }));
// }

//LinkedIn strategy
// module.exports = (passport) => {
//     passport.use(new LinkedInStrategy({
//         clientID: process.env.LINKEDIN_CLIENT_ID,
//         clientSecret: process.env.LINKEDIN_SECRET_ID,
//         callbackURL: "http://localhost:3000/linkedin/callback",
//         scope: ['r_emailaddress', 'r_liteprofile'],
//     }, function (token, tokenSecret, profile, done) {
//         return done(null, profile);
//     }
//     ))
// };

//Twitter Strategy
// module.exports = (passport) => {
//     passport.use(new TwitterStrategy({
//         clientID: process.env.TWITTER_CLIENT_ID,
//         clientSecret: process.env.TWITTER_SECRET_ID,
//         callbackURL: "http://localhost:3000/twitter/callback",
//     }, function (token, tokenSecret, profile, cb) {
//         console.log('call');
//         process.nextTick(function () {
//             console.log(profile);
//         });
//     }))
// };
