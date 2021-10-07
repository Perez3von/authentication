const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');

describe('authentication routes', () => {
  //------------------------------------------------------//
  beforeAll(() => {
    return setup(pool);
  });
  //------------------------------------------------------//

  it('/signup returns user sign up info without password', async () => {


    const resp = await request(app).post('/api/auth/signup').send({ email:'tom@jerry.com', password:'ilovethatshow' });
    expect(resp.body).toEqual({ id:1, email:'tom@jerry.com' });

  });
  //---------------------------------------------------------//
  it('gets user from database that exists', async () => {
    const user = 'tom@jerry.com';

    const resp = await User.getUser(user); //;
    expect(resp).toEqual({ id:1, email:'tom@jerry.com' });

  });

  it('tries to get user from database that doesnt exist', async () => {
    const user = 'idontexist@email.com';

    const resp = await User.getUser(user);//;
    expect(resp).toEqual(null);

  });



  //------------------------------------------------------//
  afterAll(() => {
    pool.end();
  });
  //------------------------------------------------------//
});
