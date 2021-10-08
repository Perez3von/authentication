const { Router } = require('express');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{
      console.log('IN SIGN UP');
       
      const user = await UserService.create(req.body);
      //console.log('USER', user);
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
      console.log('IN LOG IN');
      res.cookie('session', user.id, {
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
    console.log('IN LOGOUT');
    res.clearCookie('session');
    res.send('You have successfully logged out!');
    next();
    
  });


