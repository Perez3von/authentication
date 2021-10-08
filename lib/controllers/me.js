
   
const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');
 
  
module.exports = Router().get('/me', ensureAuth, async (req, res, next) => {
  try {
    
    const id = req.session;
    const user = await User.getUserById(id);
    res.send(user);
  } catch (error) {
    error.status = 401;
    next(error);
  }
});
  
  
  
  
  
  
  
  

  
