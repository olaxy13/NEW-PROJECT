
const jwt = require("jsonwebtoken");
const User = require('../models/User');


async function userChecker(req,res,next){
  const token = req.headers.authorization.substring(7,req.headers.authorization.length)
const decodeJwt = await jwt.decode(token);
if(token&&decodeJwt){
  const find_user = await User.findById(decodeJwt.id);
  console.log("find_user>>>", find_user)
  if(!find_user
    ){
    return res.status(409)
    .json({ msg : "you cannot perform this function please contact admin"})
  }else{
    return next();
  }
}
}

module.exports = {

  userChecker: userChecker,
};