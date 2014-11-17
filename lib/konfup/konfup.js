var mout = require('mout');
var path = require('path');
var util = require('util');
var valky = require('valky');
var events = require('events');
var dotenv = require('dotenv');

module.exports = Konfup;

/**
 * Main Konfup function
 * @constructor
 */
function Konfup(){
    // Bind eventemitter to konfup
    events.EventEmitter.call(this);

    // Basic config and env variables
    this.kconfig = {};
    this.kenv = dotenv;

    // Bind this to the prototype functions
    this.env = mout.function.bind(this.loadEnv, this);
    this.config = mout.function.bind(this.loadConfig, this);
    this.boot = mout.function.bind(this.boot, this);
}

util.inherits(Konfup, events.EventEmitter);

/**
 * Load the application environment from
 * a .env configuration file located at
 * the root directory.
 * @returns {Konfup}
 */
Konfup.prototype.loadEnv = function(){
    this.kenv.load();
    this.emit('konfup.env');
    return this;
};


/**
 * Load a configuration using a name of the
 * config file located at the root directory
 * or a path to an exact config file.
 * @param param
 * @returns {{}|*}
 */
Konfup.prototype.loadConfig = function(param){
    var confpath;
    if(param !== undefined){
        if(!mout.string.contains(param, '/')){
            confpath = path.resolve(path.join(process.cwd(), param + '.json'));
        } else {
            confpath = param;
        }
        mout.object.mixIn(this.kconfig, require(confpath));
    }
    this.emit('konfup.kconfig');
    return this.kconfig;
};


/**
 * Just another wrapper to run both
 * the functions env and config in series,
 * set the environment and return the
 * final config.
 * @param param
 * @returns {{}|*}
 */
Konfup.prototype.boot = function(param){
    return this.loadEnv().loadConfig(param);
};


Konfup.prototype.set = function(key, value){
    mout.object.set(this.kconfig, key, value);
};


Konfup.prototype.get = function(key){
    if(key === undefined){
      return this.kconfig;
    }
    return mout.object.get(this.kconfig, key);
};