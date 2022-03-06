const supertest = require('supertest');
const app = require('../server.js');
const api = supertest(app);

describe('GET /api/words', function() {
  it('Responds with Json', function(done) {
    api
      .get('/api/words')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});