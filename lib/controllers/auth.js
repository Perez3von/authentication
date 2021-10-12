const { Router } = require('express');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{
     
       
      const user = await UserService.create(req.body);
      
       
      res.cookie('session', user.token(), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });




      res.send(user);

    }
    catch(error){
      error.status = 401;
      next(error);
    }
  })


  .post('/login', async (req, res, next) => {
    try {
      const user = await UserService.auth(req.body);
     
      res.cookie('session', user.token(), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });
     
      res.send(user);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  })

  
  .get('/logout', async (req, res, next) => {
   
    res.clearCookie('session');
    res.send('You have successfully logged out!');
    next();
    
  });


