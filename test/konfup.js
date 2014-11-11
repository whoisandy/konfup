var _ = require('lodash');
var path = require('path');
var should = require('should');

var konflib = require('../'),
    konf = require('../lib/konfup');

var res = null;

describe('Konfup', function(){
   before(function(){
       res = konflib;
   });

    after(function(){
       res = null;
    });

   it('should return an instance of konfup and be an object', function(){
        res.should.be.an.Object;
        res.should.be.an.instanceOf(konf);
   });

   it('should have an initial config which is an empty object', function(){
      var config = res.config();
       config.kcon.should.eql.empty;
   });

   it('should expose env, config, boot functions of konfup', function(){
       res.env.should.be.an.Function;
       res.config.should.be.an.Function;
       res.boot.should.be.an.Function;
   });
});

describe('Konfup function', function(){
   before(function(){
      res = konflib;
   });

   it('env should return basic environment object', function(){
       res.env();
       process.env.NODE_ENV.should.eql('dev');
       process.env.BASIC.should.eql('basic');
       process.env.SOME_KEY.should.eql('jahbsd76asd867a7sdba87w293b927b9as');
       process.env.SOME_NAME.should.eql('cooljack');
   });

   //it('config should return an empty object if no root config file present', function(){
   //    var config = res.config();
   //    config.kcon.should.be.empty;
   //});

   it('config should return a config object if name given', function(){
       var config = res.config();
       config.kcon.should.be.an.Object;
       config.kcon.should.be.eql(_.merge(config.kcon, require('../config.json')));
   });

   it('config should return a config object if path given', function(){
       var configPath = path.resolve(path.join(process.cwd(), 'test', 'config.json'));
       var config = res.config(configPath);
       config.kcon.should.be.an.Object;
       config.kcon.should.eql(_.merge(config.kcon, require('./config.json')));
   });

   it('boot should run two functions', function(){

   });
});