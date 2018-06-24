require('dotenv').config();
const debug = require('debug')('node-kickstart:app');

const bodyParser = require('body-parser');
const express = require('express');
const util = require('util');

const app = express();
const { apiVersions, res404 } = require('./api');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const apiBase = '/api';

// Fill API version routes from API module
for (let i = 0; i < apiVersions.length; i++) {
    app.use(`${apiBase}/v${i + 1}`, apiVersions[i]);
}

// Specify latest and default API versions
app.use(`${apiBase}`, apiVersions[apiVersions.length - 1]);
app.use(`${apiBase}/latest`, apiVersions[apiVersions.length - 1]);

// Specify wildcard API routes as 404
app.all(`${apiBase}/*`, (req, res) => {
    res404(req, res);
});

app.listen(port, () => {
    debug(`App listening on ${port}`);
});

process.on('unhandledRejection', (reason, p) => {
    debug(`Unhandled Rejection at: Promise ${util.inspect(p)} reason ${reason}`);
});

exports.default = app;
