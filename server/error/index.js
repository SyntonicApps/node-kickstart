const HttpStatus = require('http-status-codes');

/**
 * Generic Unknown Error
 * @extends Error
 */
class UnknownError extends Error {
    /**
     *  @param {Number} statusCode
     *  @param {String} message
     */
    constructor(statusCode = 500, message = 'An unknown error occurred') {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.UnknownError = UnknownError;

/**
 * Generic Bad Request 400 Error
 * @extends Error
 */
class BadRequestError extends Error {
    /**
     * @param  {String} message
     */
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = HttpStatus.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;

/**
 * Generic Internal Server 500 Error
 * @extends Error
 */
class InternalServerError extends Error {
    /**
     * Empty constructor
     */
    constructor() {
        const message = 'We are sorry, an internal server error occurred. Please try your request again at a later time.';
        super(message);
        this.message = message;
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
exports.InternalServerError = InternalServerError;

/**
 * Error for API Route Not Found
 * @extends Error
 */
class RouteNotFoundError extends Error {
    /**
     * @param  {String} method
     */
    constructor(method) {
        const message = `The requested ${method} route was not found.`;
        super(message);
        this.message = message;
        this.statusCode = HttpStatus.NOT_FOUND;
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
