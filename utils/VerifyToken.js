var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyToken(req, res, next) {

  // check Authorization header for jwt token
  var token = req.headers['Authorization'] || req.headers['authorization'];
  if (!token) 
    return res.status(403).send({ message: 'No jwt token provided in the Authorization header' });

  // verifies jwt and checks the expiry
  jwt.verify(token.replace('Bearer ', ''), config.jwtKey, function(err, decoded) {      
    if (err) 
      return res.status(401).send({ message: 'Failed to authenticate token' });    
    next();
  });

}

module.exports = verifyToken;