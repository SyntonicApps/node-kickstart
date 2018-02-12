const _ = require('lodash');
const HttpStatus = require('http-status-codes');

const { buildApiResponse } = require('./helpers');

const v1 = require('./v1').default;

exports.apiVersions = [v1];
exports.res404 = _.partialRight(buildApiResponse, HttpStatus.NOT_FOUND);
exports.buildApiResponse = buildApiResponse;
