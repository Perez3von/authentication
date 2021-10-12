
   
const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');
 
  
module.exports = Router()

  .get('/', ensureAuth, async (req, res, next) => {
    try {
    
      const id = req.user.id;
    
      const user = await User.getUserById(id);
      res.send(user);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  })

  .get('/apples', ensureAuth,  async (req, res, next) => {
    try {
    
      res.send('<h1>Welcome to Apples Page</h1>');
    } catch (error) {
      error.status = 401;
      next(error);
    }
  });

  
  
  
  
  
  
  
  

  
