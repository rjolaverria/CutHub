const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Retrieve token from header
  const token = req.header('x-auth-token');

  //Verify token
  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, config.get('JWTsecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ msg: 'Invalid token' });
  }
};
