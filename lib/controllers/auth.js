const { Router } = require('express');




module.exports = Router()


  .post('/signup', async (req, res, next) => {

    try{

        console.log("IM HERE");
      res.json('HELLO ITS A TEST');

    }
    catch(error){

      next(error);
    }
  });
