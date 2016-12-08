require('dotenv').config();

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../app');

describe('API Test Suite', function() {
    describe('GET /api', function() {
        it('should respond with JSON message', function(done) {
            request(app)
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, result) {
				let json = result.body;
                assert.equal(json.message, 'Welcome to the API!' );
				done();
			});
        });
    });
});