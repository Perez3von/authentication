
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const Role = require('./Role');
const User = require('./User');
module.exports = class Admin{




  constructor(row){

    this.id = Number(row.id);
    this.email = row.email;
    this.role = row.title;
    
  }

  static async modUserTitle(id){

    const user = await User.getUserById(id);

    const role = await Role.getByTitle(user.role);

    console.log('THE USER', user);
    console.log('THE ROLE', role);


  }









//----------------------------------------------------//
};

//----------------------------------------------------//
