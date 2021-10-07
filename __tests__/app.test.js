const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('authentication routes', () => {
  //------------------------------------------------------//
  beforeAll(() => {
    return setup(pool);
  });
  //------------------------------------------------------//

  it('/signup returns user sign up info without password', async (res, req) => {


    const resp = await request(app).post('/api/auth/signup').send(req.body);
    expect(resp).toEqual({ id:1, user: 'tom@jerry.com' });

  });








  //------------------------------------------------------//
  afterAll(() => {
    pool.end();
  });
  //------------------------------------------------------//
});
