const util = require('util');

/**
 * Prints an object fully and prettily with util.inspect
 * @param  {Object} obj
 * @return {Object}     Inspected object
 */
exports.prettyJSON = (obj) => {
    return util.inspect(obj, { showHidden: false, depth: null, colors: true });
};
