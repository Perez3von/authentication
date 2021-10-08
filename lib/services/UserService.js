const User = require('../models/User.js');
const bcrypt = require('bcrypt');




module.exports = class UserService{
//-----------------------------------------------------//
  static async create({ password, email }){
    
    const existingUser = await User.getUser(email);

    if (existingUser) {
      throw new Error('User already exists for the given email');
    }
    
    const pass = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    
    const user = await User.insertUser({ pass, email });
   
    return user;

  }
  //-----------------------------------------------------//


  static async auth({ email, password }){

    const existingUser = await User.getUser(email);
    if (!existingUser) {
      throw new Error('Invalid email/password');
    }
    const pass = await bcrypt.compare(
      password,
      existingUser.ePass
    ); 
    if (!pass) {
      throw new Error('Invalid email/password');
    }
    return existingUser;
  }















//-----------------------------------------------------//
};
