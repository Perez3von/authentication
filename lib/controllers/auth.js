const { Router } = require('express');
const UserService = require('../services/UserService');
const Admin = require('../models/Admin');
const ensureAuth = require('../middleware/ensure-auth');
const ensureAdmin = require('../middleware/ensure-admin');


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
    
  })


  .post('/admin/:id', ensureAuth, ensureAdmin, async (req, res, next) => {

    try {
      
      Admin.modUserTitle(req.params.id);
     
      res.send(200);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  
    
  });


