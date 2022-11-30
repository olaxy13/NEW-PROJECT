const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("./auth.model");
const Wallet = require("../wallet/wallet.model")
const vm = require("v-response");
const {createToken} = require ("../config/jwt")

/**
 * @controller User authentication controller
 * */
/**
 * @param
 * */

//CREATE ACCOUNT
exports.CreateAccount = async (req, res, next) => {
    try {
        const { email} = req.body;
        const checkUserEmail = await User.findOne({ email })
        if (checkUserEmail) {
            return res.status(409)
                .json(vm.ApiResponse(false, 409, 'email already exist'))
        } else if (!checkUserEmail) {
            const create_user = new User (req.body);
           // vm.hashedPassword(create_user.password, 10),
            _.extend(req.body, {
                password: await vm.hashedPassword(create_user.password, 10),
            })
            const save_user = await create_user.save();
               if (!save_user) {
                return res.status(400)
                    .json(vm.ApiResponse(false, 400, "Oops! an error occurr"))
            } else {  let obj = save_user
                console.log("REallty", obj) 
                const create_wallet = new Wallet (req.body)
                const save_wallet = await create_wallet.save()
                console.log("olaaaa",save_wallet)
                save_user.password = undefined;
                _.extend(save_user, { save_wallet: save_wallet
                })
                return res.status(201)
                    .json(vm.ApiResponse(true, 200, `account created`, save_user));
            }

            // _.extend(obj, {
                
            //     password: await vm.hashedPassword(obj.password, 10),
            // });
            // const account_object = await new User(obj);
            // const saveAccount = await account_object.save();
            // if (!saveAccount) {
            //     return res.status(400)
            //         .json(vm.ApiResponse(false, 400, "Oops! an error occurr"))
            // } else {
            //     saveAccount.password = undefined;
            //     return res.status(201)
            //         .json(vm.ApiResponse(true, 200, `account created`, account_object));
            // }
        }
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                })
        }
        return next(error);
    }

}
//LOGIN
exports.login = async (req, res, next) => {
    try {
        const { email, password} = req.body
       const  user = await User.findOne({ email });
        if (!user) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, 'email not found'))
        } 
            const compareEmail = vm.comparepassword(user.password, password);
            if (compareEmail) {
                const {fullName , _id} = user 
                const signtoken = createToken({ fullName, _id })
               const { password, ...other} = user._doc; // we return every details except password
                // user.password = undefined;
                return res.status(200)
                    .json(vm.ApiResponse(true, 200, "login sucessfull", { user: other, token: signtoken }))
            }
    } catch (error) {
        if(error.isJoi === true) {
            return res.status(400).json({
                status: false,
                    code: 400,
                    message: "There's error in your inputs",
            })
        }
        return next(error); 
    }

};

// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/google/callback', 
//     passport.authenticate('google', 
//     {failureRedirect: '/failed'}), 
//     (req, res) => {
//         res.redirect('/good');
//     })

// app.get('/profile',  (req,res) => {
//     console.log("----->",req.user)
//     res.render('pages/profile', {
//         profile: "facebook",
//         name:req.user.displayName,
//         pic:req.user.photos[0].value,
//         email:req.user.emails[0].value // get the user out of session and pass to template
//     });
// })

// app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));