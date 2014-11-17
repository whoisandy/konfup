var fs = require('fs');
var path = require('path');
var util = require('util');
var events = require('events');

var mout = require('mout');
var valky = require('valky');
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

  // Load env and config funcs on proto
  // and bind them to this in the constructor
}

util.inherits(Konfup, events.EventEmitter);

/**
 * Inject variables into the config
 * file read from the options. Fill
 * in them with actual environment vars
 * @param data
 * @param envr
 * @returns {*}
 * @private
 */
Konfup.prototype._inject = function(data, envr){
  var obj = JSON.parse(data);
  data.replace(/#\{(.*)\}/g, function(match, code){
    var envvar = code.split('.').pop();
    var confKey = valky(obj, match);

    if(envvar !== 'NODE_ENV') {
      // use mout here to set or unset values, since its the safe
      // and compact method to set objects key value
      if(mout.object.has(process.env, envvar)){
        mout.object.set(obj, confKey, mout.string.typecast(process.env[envvar]));
      } else {
        mout.object.set(obj, confKey, undefined);
      }
    }

    // Check for environment on process and if its
    // not present, default it to production. Otherwise
    // if envr is provided explicitly then set the env
    // to envr.
    obj['env'] = process.env.NODE_ENV || 'production';
    if(envr !== undefined) {
      obj['env'] = envr;
    }
  });
  return obj;
};

/**
 * Load the application environment from
 * a .env configuration file located at
 * the root directory.
 * @returns {Konfup}
 */
Konfup.prototype.loadEnv = function(envr){
  this.kenv.load();
  if(envr !== undefined) {
    process.env.NODE_ENV = envr;
  }
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
Konfup.prototype.loadConfig = function(param, envr){
  var confpath, obj;

  this.loadEnv();
  if(envr !== undefined) {
    this.loadEnv(envr);
  }

  if(param !== undefined) {
    if(!mout.string.contains(param, '/')){
      confpath = path.resolve(path.join(process.cwd(), param + '.json'));
    } else {
      confpath = param;
    }
  } else {
    confpath = path.resolve(path.join(process.cwd(), 'config.json'));
  }

  try {
    var data = fs.readFileSync(confpath, 'utf8');
    obj = this._inject(data, envr);

  } catch(e) {
    obj = {};
  }

  mout.object.mixIn(this.kconfig, obj);
  this.emit('konfup.kconfig');
};


/**
 * Just another wrapper to run both
 * the functions env and config in series,
 * set the environment and return the
 * final config.
 * @param param
 * @returns {{}|*}
 */
Konfup.prototype.boot = function(envr, param){
  this.loadEnv(envr).loadConfig(param, envr);
  return this;
};


Konfup.prototype.set = function(key, value){
  mout.object.set(this.kconfig, key, value);
  return this;
};


Konfup.prototype.get = function(key){
  if(key === undefined){
    return this.kconfig;
  }
  return mout.object.get(this.kconfig, key);
};
