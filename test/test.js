require('dotenv').config();

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../app');

describe('API Test Suite', () => {
    describe('GET /api/v1', () => {
        it('should respond with JSON message', (done) => {
            request(app)
            .get('/api/v1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, result) => {
                let json = result.body;
                assert.equal(json.message, 'API version: 1' );
                done();
            });
        });
    });
});
