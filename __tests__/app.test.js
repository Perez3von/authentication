const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('authentication routes', () => {
  //------------------------------------------------------//
  beforeEach(() => {
    return setup(pool);
  });
  //------------------------------------------------------//

  it('/signup returns user sign up info without password', async () => {


    const resp = await request(app).post('/api/auth/signup').send({ email:'tom@jerry.com', password:'ilovethatshow' });
    expect(resp.body).toEqual({ id:1, email:'tom@jerry.com' });

  });
  //---------------------------------------------------------//







  //------------------------------------------------------//
  afterAll(() => {
    pool.end();
  });
  //------------------------------------------------------//
});
