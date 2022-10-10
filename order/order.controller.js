const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
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
  

