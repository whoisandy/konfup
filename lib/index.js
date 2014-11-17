var mout = require('mout');
var Konfup = require('./konfup/konfup');

module.exports = new KonfupFactory();

function KonfupFactory(){
  var self = this;
  var k = new Konfup();

  /**
   * Get config value by key
   * @param key
   */
  this.get = mout.function.bind(k.get, k);

  /**
   * Set config using a key value pair
   * @param key
   * @param val
   * @returns {KonfupFactory}
   */
  this.set = mout.function.bind(k.set, k);

  /**
   * Initial boot function to boot
   * up the configuration
   * @param param
   * @returns {{get: Function, set: Function}}
   */
  this.boot = mout.function.bind(k.boot, k);

  return {
    get: self.get,
    set: self.set,
    boot: self.boot
  };
}
