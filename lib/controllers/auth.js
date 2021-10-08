const { Router } = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{
      const pass = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
      const user = await User.insertUser({ password:pass, email:req.body.email });
      res.json(user);

    }
    catch(error){

      next(error);
    }
  });
