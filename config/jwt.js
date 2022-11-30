const jwt = require('jsonwebtoken');
const  dotenv  = require("dotenv");

dotenv.config();

const createToken = ({ fullName, _id, }) =>
  jwt.sign(
    {
      fullName,
      _id,
    },
      "secret",
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




// const verifyJwtToken = (token, secret) =>
// console.log("Token1", token)
//   new Promise((resolve, reject) =>
//     jwt.verify(token, secret, (err, decoded) => {
//       // err
//       console.log("Token2", token)
//       if (err) 
//       console.log("MINE>>>", err) 
//       return reject(err);
//       resolve(decoded);
//     })
//   );
  module.exports = {
    createToken,
    verifyJwtToken
  };


  //
  // git config --global user.email "you@example.com"
  // git config --global user.name "Your Name"