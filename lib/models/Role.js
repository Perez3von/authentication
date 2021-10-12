
const pool = require('../utils/pool');


module.exports = class Role{

  constructor(row){

    this.id = Number(row.id);
    this.title = row.title;

  }

  //----------------------------------------------------//
 

  static async getByTitle(role){
console.log('IM the role', role);
    const { rows } = await pool.query(`

SELECT * 
FROM roles
WHERE title = $1

`, [role.toUpperCase()]);

    if(!rows){
      return null;
    }
    return new Role(rows[0]);

  }

  //----------------------------------------------------//

  static async getById({ id }){

    const { rows } = await pool.query(`

SELECT * 
FROM roles
WHERE id = $1

`, [id]);

    if(!rows){
      return null;
    }
    return new Role(rows[0]);

  }



//----------------------------------------------------//
};

//----------------------------------------------------//
