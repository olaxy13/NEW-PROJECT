const express = require("express");
//const fileupload = require("express-fileupload");
const passport = require('passport');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const vm = require("v-response");

 const REGISTER = require("./auth/auth.route");
 const LOGIN = require("./auth/auth.route");
 const PROFILE = require("./profile/profile.route")
 const CART = require("./cart/cart.route")
 const UploadCourses = require("./product/product.route");
 const PRODUCT = require("./product/product.route");
 const UpdateProduct = require("./product/product.route");
 const DeleteProduct = require("./product/product.route");
 const GetProduct = require("./product/product.route");
 const ReviewProduct = require("./product/product.route")
const PROFILEIMAGE = require("./profile/profile.route")

 //Order
 const CreateOrder = require("./order/order.route");
 const UpdateOrder = require("./order/order.route");
 const DeleteOrder = require("./order/order.route");
 const GetOrder = require("./order/order.route");
 const GetOrderAdmin = require("./order/order.route");
 const GetIncome = require("./order/order.route");
 const Payment = require("./order/order.route");
 const VerifyPayment = require("./order/order.route");
 const Receipt = require("./order/order.route");

 //WALLET
 const FundAccount = require("./wallet/wallet.route");
 const Verify  = require("./wallet/wallet.route")
 const FUND = require("./wallet/wallet.route")
 
 dotenv.config();

const app = express();
app.get('/', (req, res) => res.send('Hello World'));

//app.use(fileupload())

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
app.use('/api', PROFILEIMAGE);
app.use('/api', CART);
app.use('/api', PRODUCT);
app.use('/api', UpdateProduct);
app.use('/api', DeleteProduct);
app.use('/api', GetProduct);
app.use('/api', ReviewProduct);
app.use('/api', UploadCourses);


//Order
app.use('/api', CreateOrder);
app.use('/api', UpdateOrder);
app.use('/api', DeleteOrder);
app.use('/api', GetOrder);
app.use('/api', GetOrderAdmin);
app.use('/api', GetIncome);
app.use('/api', Payment);
app.use('/api', VerifyPayment);
app.use('/api', Receipt);

//Wallet
app.use("/api", FundAccount)
app.use("api", Verify)
app.use("api", FUND)



const port = process.env.PORT || 2050;

app.listen(port, () =>
    console.log(`Server Welcomes you to a new world  running on ${port}`)
);



