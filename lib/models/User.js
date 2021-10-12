
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User{

  constructor(row){

    this.id = Number(row.id);
    this.email = row.email;
    this.ePass = row.hash_password;

  }

  //----------------------------------------------------//
  static async insertUser({ pass, email }){

    const { rows } = await pool.query(`
    INSERT INTO users (email, hash_password) VALUES ($1, $2) 
    RETURNING * `, [email, pass]);
    
    return new User(rows[0]);

  }
  //----------------------------------------------------//
  static async getUser(email){

    const { rows } = await pool.query(`
    SELECT *
    FROM users
    WHERE email = $1 `, [email]);

    if (!rows[0]) return null;
    
    return new User(rows[0]);

  }
  //----------------------------------------------------//

  static async getUserById(id){

    const { rows } = await pool.query(`
    SELECT *
    FROM users
    WHERE id = $1 `, [id]);

    if (!rows[0]) return null;
    
    return new User(rows[0]);

  }
  //----------------------------------------------------//

  token(){
    return jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

  }

   //----------------------------------------------------//
  toJSON(){

    return { id:this.id, email:this.email };
  }

  //----------------------------------------------------//
















//----------------------------------------------------//
};

//----------------------------------------------------//
