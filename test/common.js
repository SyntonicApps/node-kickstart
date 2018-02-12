process.env.NODE_ENV = 'test';

const app = require('../server/app');
require('dotenv').config({ silent: true });

exports.app = app.default;
