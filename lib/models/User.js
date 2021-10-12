
const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');
const Role = require('./Role');
module.exports = class User{

  constructor(row){

    this.id = Number(row.id);
    this.email = row.email;
    this.ePass = row.hash_password;
    this.role = row.role_id;

  }

  //----------------------------------------------------//
  static async insertUser({ pass, email, role }){

    const role_ = await Role.getByTitle(role);
    console.log('The ROLE', role_);
    if(role_){

      const { rows } = await pool.query(`
          INSERT INTO users (email, hash_password, role_id) VALUES ($1, $2, $3) 
          RETURNING * `, [email, pass, role_.id]);
          
      return new User({ ...rows[0], role_id: role_.title });

    }

    return role_; 
    
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

    return { id:this.id, email:this.email, role:this.role };
  }

  //----------------------------------------------------//
















//----------------------------------------------------//
};

//----------------------------------------------------//
