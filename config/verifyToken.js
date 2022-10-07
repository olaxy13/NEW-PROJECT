/* eslint-disable brace-style */
const { verifyJwtToken } = require('./jwt');
const  dotenv = require("dotenv")
dotenv.config();


const validateAccessToken = (req, res, next) => {
  try {
    const token = req?.headers?.Authorization || req?.headers?.authorization;
    const getToken = token?.split(':')[1]?.trim();

    verifyJwtToken(getToken, process.env.jwtSecret)
      .then((data) => {
        req.sub = data;
        next();
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
