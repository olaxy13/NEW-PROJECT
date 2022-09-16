const express = require("express");
const passport = require('passport');
//const cookieSession = require('cookie-session')
//app.set("view engine", "ejs")
const bodyParser = require("body-parser");
const port = process.env.PORT || 2000;
const vm = require("v-response");
//const morgan = require('morgan');
const mongoose = require("mongoose")
//app.use(express.json());
//app.use(morgan('dev'));
const db = require("./config/keys").mongoURI;
const REGISTER = require("./auth/auth.route");

const app = express();
app.use('/api', REGISTER);
app.get('/', (req, res) => res.send('Hello World'));


mongoose
    .connect(db)
    .then(() => console.log("MongoDB Conected"))
    .catch((error) => console.log(error));


//app.listen(port, () => vm.log("server running on port:", port));


app.listen(port, () =>
    console.log(`Server Welcomes you to a new world  running on ${port}`)
);


// //Setting up cookies
// app.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
// }))


//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use("/api/user", user);

//Passport middleware
app.use(passport.initialize());


//Passport Config
require("./config/passport")(passport);

// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/google/callback',
//     passport.authenticate('google',
//         { failureRedirect: '/failed' }),
//     (req, res) => {
//         res.redirect('/good');
//     })

// app.get('/profile', (req, res) => {
//     console.log("----->", req.user)
//     res.render('pages/profile', {
//         profile: "facebook",
//         name: req.user.displayName,
//         pic: req.user.photos[0].value,
//         email: req.user.emails[0].value // get the user out of session and pass to template
//     });
// })

// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// app.get('/auth/linkedin',
//     passport.authenticate('linkedin', {
//         scope: ['r_emailaddress', 'r_liteprofile']
//     }
//     ));

// app.get('/auth/twitter',
//     passport.authenticate('twitter', {
//         scope: 'email'
//     }
//     ));

// app.get('/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/profile',
//         failureRedirect: '/'
//     }
//     ));

// app.get('/linkedin/callback',
//     passport.authenticate('linkedin', {
//         successRedirect: '/profile',
//         failureRedirect: '/'
//     }
//     ));


// app.get('/twitter/callback',
//     passport.authenticate('linkedin', {
//         successRedirect: '/profile',
//         failureRedirect: '/'
//     }
//     ));































// const REGISTER = require("./authentication/auth.route");

// const LEAVE = require("./leave/leave.route");
// app.use(express.json());
// app.use(morgan('dev'));
// app.use('/api', REGISTER);
// app.use('/api', LEAVE);