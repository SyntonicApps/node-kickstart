const debug = require('debug')('node-kickstart:api:v1');

const express = require('express');
const { check } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const HttpStatus = require('http-status-codes');

const { prettyJSON } = require('../utils');

const { InternalServerError } = require('../error');
const { buildApiResponse, handleServerError, handleValidationErrors } = require('./helpers');

const v1 = new express.Router();
const v1Response = (req, res) => {
    return buildApiResponse(req, res, HttpStatus.OK, 'API version: 1');
};

v1.get('', v1Response);
v1.get('/version', v1Response);

v1.post('/test', [
    check('param', `Missing required body parameter: 'param'`).exists()
], async (req, res) => {
    if (handleValidationErrors(req, res)) return;

    const body = matchedData(req);
    debug(`Received post to /test with body:\n${prettyJSON(body)}`);

    try {
        // Some Controller code
        if (typeof body.param === 'number') throw new InternalServerError();
        return buildApiResponse(req, res, HttpStatus.OK, `You sent param as ${body.param}`);
    } catch (err) {
        return handleServerError(req, res, err);
    }
});

exports.default = v1;
