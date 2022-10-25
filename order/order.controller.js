const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
const Payment = require("../models/Buy")
const vm = require("v-response");
const {createToken} = require ("../config/jwt");
const Order = require("../order/order.model");


//CREATE
exports.CreateOrder = async (req, res, next) => {
  try{
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder)
  } catch (error) {
    if (error) {
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

//UPDATE CART
exports.UpdateOrder = async (req, res, next) => {
  try {
      const updated_order = await Order.findOne({id: req.body.id});
      console.log(updated_order, "dfghj")
      Object.assign(updated_order, req.body);
      updated_order.save((err, savedOrder) => {
          if (err) {
            console.log("saved-err:", err);
            return next();
          }
          return res.status(200).json({ status: "true", msg: "You have successfuly updated your Order", savedOrder })
        });
  } catch (error) {
      if (error) {
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


//DELETE CART
exports.DeleteOrder = async (req, res, next) => {
  try {
      const find_order = await Order.findOne({id: req.body.id});
      if(find_order) {
          await Order.findByIdAndDelete(find_order)
          return res.status(200).json({ status: true, msg:"You have Succesfully deleted cart"})
      } 
      return res.status(404).json({ status: false, msg:"cart does not Exist"})
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

//GET CART
exports.GetOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({id: req.body.id})
    return res.status(200).json(order)
  } catch (error) {
      if (error) {
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

//GET Order ADMIN ONLY
exports.GetOrderAdmin = async (req, res, next) => {
  try {
    const orders = await Order.findOne()
    return res.status(200).json(orders)
  } catch (error) {
      if (error) {
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

//GET Monthly Income
exports.GetIncome = async (req, res, next) => {
    try {
      const date = new Date();
      const lastMonth = new Date(date.setMonth(date.getMonth() -1));
      const previousMonth = new Date(new Date.setMonth(lastMonth.getMonth() -1));
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project:  {
                month: { $month: "$createdAt"},
                sales: "$amount"
            },
            
                $group:  {
                    _id: "$amount",
                    total: { $sum: "$sales"}
                },
            
        },
      ]);
      
      return res.status(200).json(income)
    } catch (error) {
        if (error) {
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
  

exports.Payment = async (req, res, next) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return;
       }
       response = JSON.parse(body);
       res.redirect(response.data.authorization_url)
    });
};

exports.VerifyPayment = async  (req, res, next) => {
    // const ref = req.query.reference;
    const ref = req.body;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);
        console.log(response)
        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
        [reference, amount, email, full_name] = data;
        newPaid = {reference, amount, email, full_name}
        const payment = new Payment(newPaid)
        payment.save().then((payment)=>{
            if(payment){
                res.redirect('/receipt/'+payment._id);
            }
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
}

exports.Receipt = async (req, res, next) => {
    const id = req.params.id;
    Payment.findById(id).then((payment)=>{
        if(!payment){
            //handle error when the payment is not found
            res.redirect('/error')
        }
        res.render('success.pug',{payment});
    }).catch((e)=>{
        res.redirect('/error')
    });
};