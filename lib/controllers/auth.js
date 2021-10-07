const { Router } = require('express');




module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{


      res.json('HELLO ITS A TEST');

    }
    catch(error){

      next(error);
    }
  });
