const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const verifyToken = require('../../middleware/verifytoken');
const User = require('../../models/User');

// @route    GET api/auth
// @desc     Find authorized user and return data
// @access   Public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/auth
// @desc     Sign in & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Please enter a password with 6+ characters').exists()
  ],
  async (req, res) => {
    //Validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Request body
    const { email, password } = req.body;

    try {
      //Check if User exists and password matches
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //Create and return JWT
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('JWTsecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.send({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
