const { Router } = require('express');
const User = require('../models/User');



module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{

      const user = await User.insertUser(req.body);
      res.json(user);

    }
    catch(error){

      next(error);
    }
  });
