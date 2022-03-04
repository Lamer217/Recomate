// const router = require('express').Router();
const jwt = require('express-jwt');

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
});

/* Function that will be used to extract the JWT fro the request's
'Authorisation' headers  */
function getTokenFromHeaders(req) {
  // Check if the token is available on the request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

module.exports = { isAuthenticated };
