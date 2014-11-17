/**
 * Returns a singleton instance
 * of the konfup function.
 * @type {exports}
 */
var konfup = require('./lib');
module.exports = konfup;

// Raw testing purposes
//var config = konfup.boot('dev', 'settings').get();
//console.log(config);
