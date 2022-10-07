const jwt = require('jsonwebtoken');
const  dotenv  = require("dotenv");

dotenv.config();

const createToken = ({ fullName, _id, }) =>
  jwt.sign(
    {
      fullName,
      _id,
    },
    process.env.jwtSecret,
    { expiresIn: '1h' }
  );

const verifyJwtToken = (token, secret) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => {
      // err
      if (err) return reject(err);
      resolve(decoded);
    })
  );
  module.exports = {
    createToken,
    verifyJwtToken
  };


  //
  // git config --global user.email "you@example.com"
  // git config --global user.name "Your Name"