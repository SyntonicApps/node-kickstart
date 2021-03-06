const { app } = require('./common');

const assert = require('chai').assert;
const request = require('supertest');

const handleError = (err) => {
    throw new Error(err);
};

describe('API Test Suite', () => {
    describe('API Version tests', () => {
        describe('GET /api/v1', () => {
            it('should respond with JSON message containing version 1 response', async () => {
                const result = await request(app)
                    .get('/api/v1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .catch(handleError);

                let json = result.body;
                assert.equal(json.message, 'API version: 1');
            });
        });
        describe('GET /api', () => {
            it('should respond with JSON message containing latest version response', async () => {
                const result = await request(app)
                    .get('/api')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .catch(handleError);

                let json = result.body;
                assert.equal(json.message, 'API version: 1');
            });
        });
        describe('GET /api/latest', () => {
            it('should respond with JSON message containing latest version response', async () => {
                const result = await request(app)
                    .get('/api/latest')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .catch(handleError);

                let json = result.body;
                assert.equal(json.message, 'API version: 1');
            });
        });
    });

    // 404 test
    describe('GET /api/unknown', () => {
        it('should respond with 404 and error message', async () => {
            const result = await request(app)
                .get('/api/unknown')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
                .catch(handleError);

            let json = result.body;
            let expected = `The requested GET route was not found.`;

            assert.equal(json.status, 404);
            assert.equal(json.error.message, expected);
            assert.equal(json.error.type, 'Not Found');
        });
    });

    describe('POST /api/test', () => {
        describe(`Missing 'param'`, () => {
            it('should respond with missing param error', async () => {
                const result = await request(app)
                    .post('/api/test')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .catch(handleError);

                let json = result.body;
                let expected = `Missing required body parameter: 'param'`;

                assert.equal(json.status, 400);
                assert.equal(json.error.message, expected);
                assert.equal(json.error.type, 'Bad Request');
            });
        });

        describe(`{"param": 0}`, () => {
            it('should respond with InternalServerError', async () => {
                const result = await request(app)
                    .post('/api/test')
                    .set('Accept', 'application/json')
                    .send({ param: 0 })
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .catch(handleError);

                let json = result.body;
                let expected = `We are sorry, an internal server error occurred. Please try your request again at a later time.`;

                assert.equal(json.status, 500);
                assert.equal(json.error.message, expected);
                assert.equal(json.error.type, 'Server Error');
            });
        });

        describe(`{"param": "TEST"}`, () => {
            it('should respond with missing param error', async () => {
                const result = await request(app)
                    .post('/api/test')
                    .set('Accept', 'application/json')
                    .send({ param: 'TEST' })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .catch(handleError);

                let json = result.body;
                let expected = `You sent param as TEST`;

                assert.equal(json.message, expected);
            });
        });
    });
});
