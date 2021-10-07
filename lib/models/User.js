
const pool = require('../utils/pool');

module.exports = class User{

  constructor(row){

    this.id = Number(row.id);
    this.email = row.email;
    this.ePass = row.hash_password;

  }

//----------------------------------------------------//
  static async insertUser({email, password}){

    const {rows} = await pool.query(`
    INSERT INTO users (email, hash_password) VALUES ($1, $2) 
    RETURNING * `, [email, password]);

    return new User(rows[0]);

  }
//----------------------------------------------------//
  toJSON(){

    return { id:this.id, email:this.email };
  }

//----------------------------------------------------//
















//----------------------------------------------------//
};

//----------------------------------------------------//
