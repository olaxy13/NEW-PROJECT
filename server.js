const express = require("express");
const passport = require('passport');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const vm = require("v-response");

 const REGISTER = require("./auth/auth.route");
 const LOGIN = require("./auth/auth.route");
 const PROFILE = require("./profile/profile.route")
 const CART = require("./cart/cart.route")

 dotenv.config();

const app = express();
app.get('/', (req, res) => res.send('Hello World'));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose
    .connect(process.env.mongoURI)
    .then(() => console.log("MongoDB Conected"))
    .catch((error) => console.log(error));

//Passport middleware
// app.use(passport.initialize());

//Passport Config
// require("./config/passport")(passport);

app.use('/api', REGISTER);
app.use('/api', LOGIN);
app.use('/api', PROFILE);
app.use('/api', CART);


const port = process.env.PORT || 2050;

app.listen(port, () =>
    console.log(`Server Welcomes you to a new world  running on ${port}`)
);



