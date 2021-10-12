   
const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    
    res.send('<h1>Hello Public</h>');

  } catch (error) {
    
    next(error);
  }
});

  
