const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
//const UserService = require('../lib/services/UserService');
const User = require('../lib/models/User.js');

describe('authentication routes', () => {
  //------------------------------------------------------//
  beforeAll(() => {
    return setup(pool);
  });
  //------------------------------------------------------//

  it('POST /signup returns user sign up info without password', async () => {


    const resp = await request(app).post('/api/auth/signup').send({ email:'tom@jerry.com', password:'ilovethatshow' });
    
    expect(resp.body).toEqual({ id:1, email:'tom@jerry.com' });

  });
  //---------------------------------------------------------//
  it('gets user from database that exists', async () => {
    const user = 'tom@jerry.com';
    let bool = false;
    const resp = await User.getUser(user); //;
    if(resp) bool = true; 
    expect(bool).toEqual(true);

  });
  //---------------------------------------------------------//
  it('tries to get user from database that doesnt exist', async () => {
    const user = 'idontexist@email.com';
    let bool = false;
    const resp = await User.getUser(user); //;
    if(resp) bool = true; 
    expect(bool).toEqual(false);

  });

  //-----------------------------------------------//
  it('POST /signup returns error 404', async () => {


    const resp = await request(app).post('/api/auth/signup').send({ email:'tom@jerry.com', password:'ilovethatshow' });
   
    expect(resp.status).toEqual(401);

  });

  //---------------------------------------------------------//
  it('POST /login returns user id info without password', async () => {


    const resp = await request(app).post('/api/auth/login').send({ email:'tom@jerry.com', password:'ilovethatshow' });
    const user = await User.getUser('tom@jerry.com');
    expect(resp.body.id).toEqual(user.id);

  });



  //------------------------------------------------------//
  it('POST /login returns status code error', async () => {


    const resp = await request(app).post('/api/auth/login').send({ email:'tom@gmail.com', password:'ilovethatshow' });
   
    expect(resp.status).toEqual(401);

  });



  //------------------------------------------------------//

  it('GET route to /me that responds with the currently logged in User', async () => {

    const agent = request.agent(app);
    await agent.post('/api/auth/login').send({ email:'tom@jerry.com', password:'ilovethatshow' });
    const res = await agent.get('/api/me');
    //console.log(res.body);
    expect(res.body).toEqual({ id:1, email:'tom@jerry.com' });

  });



  //------------------------------------------------------//
  afterAll(() => {
    pool.end();
  });
  //------------------------------------------------------//
});
