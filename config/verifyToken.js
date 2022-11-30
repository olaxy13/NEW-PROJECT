/* eslint-disable brace-style */
const { verifyJwtToken } = require('./jwt');
const  dotenv = require("dotenv")
dotenv.config();


const validateAccessToken = (req, res, next) => {
  try {
    const token = req?.headers?.Authorization || req?.headers?.authorization;
   console.log("token!", token)
    const getToken = token?.split(':')[1]?.trim();
    console.log("token!!!!", getToken)
    verifyJwtToken(getToken, "secret")
      .then((data) => {
        req.sub = data;
       next();
       console.log('SUCCESS',);
      })
      .catch((err) => {
      console.log('token validation error', err);
        res
          .status(401)
          .json({
            success: false,
            message: 'Invalid access token',
            data: {}
        })
        .end();
    });
} catch (error) {
  next(error);
}
};

module.exports = validateAccessToken;
