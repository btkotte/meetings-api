var express = require('express');
var router = express.Router();
router.use(express.json());
var User = require('../model/User');

//Configure JWT libraries
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/register', function (req, res) {

  if (!req.body.name)
    return res.status(400).send({ message: 'name is required' });

  if (!req.body.email)
    return res.status(400).send({ message: 'email is required' });

  if (!req.body.password)
    return res.status(400).send({ message: 'password is required' });

  //Check if the user is already registered
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ message: 'Server error' });
    if (user) return res.status(400).send({ message: 'user already registered' });

    // Password should not be saved as clear text in the DB, so hashing it
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //Save new user to the DB
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    },
      function (err, user) {
        if (err) return res.status(500).send({ message: 'Server error' });

        res.status(200).send({ message: 'user successfuly registered' });
      });
  });


});

router.post('/login', function (req, res) {

  if (!req.body.email)
    return res.status(400).send({ message: 'email is required' });

  if (!req.body.password)
    return res.status(400).send({ message: 'password is required' });

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ message: 'Server error' });
    if (!user) return res.status(401).send({ message: 'Invalid email or password' });

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: 'Invalid email or password' });

    // if user is found and password is valid, create a token
    var jwtToken = jwt.sign({ id: user._id }, config.jwtKey, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the jwt token as JSON
    res.status(200).send({ token: jwtToken });
  });

});


module.exports = router;