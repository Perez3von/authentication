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


    const resp = await request(app).post('/api/auth/signup').send('');
    expect(resp.text).toEqual(expect.any(String));

  });
  //---------------------------------------------------------//







  //------------------------------------------------------//
  afterAll(() => {
    pool.end();
  });
  //------------------------------------------------------//
});
