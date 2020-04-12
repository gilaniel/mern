const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect pass')
      .isLength({min: 6})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const {email, password} = req.body;

      const candidate = await User.findOne({email});

      if (candidate) {
        return res.status(400).json({message: 'user exist'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({email, password: hashedPassword})

      await user.save();

      res.status(201).json({message: 'user created'});
    } catch(e) {
      res.status(500).json({ message: 'something wrong' });
    }
  }
);

router.post(
  '/login', 
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter pass ').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data'
        });
      }

      const {email, password} = req.body;

      const user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({message: 'user does not exist'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({message: 'incorrect pass'});
      }

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      );

      res.json({token, userId: user.id})
    } catch(e) {
      res.status(500).json({ message: 'something wrong' });
    }
  }
);

module.exports = router;