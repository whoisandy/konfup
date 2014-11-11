var _ = require('lodash');
var path = require('path');
var should = require('should');

var konflib = require('../'),
    konf = require('../lib/konfup');

var k, param, res;

describe('Kconfup ', function(){

    describe('function:', function(){
        before(function(){
            k = konflib;
        });

        after(function(){
            delete k;
            delete res;
        });

        it('should return an instance of konfup and be an object', function(){
            k.should.be.an.Object;
            k.should.be.an.instanceOf(konf);
        });

        it('should expose env, config, boot functions of konfup', function(){
            k.env.should.be.an.Function;
            k.config.should.be.an.Function;
            k.boot.should.be.an.Function;
        });

        it('should have an initial config which is an empty object', function(){
            res = k.config();
            res.should.be.empty;
        });
    });

    describe('method:', function(){
        beforeEach(function(){
            k = konflib;
        });

        afterEach(function(){
            k.kconfig = {};
            res = undefined;
            param = undefined;
        });

        it('.env() should return basic env object', function(){
            res = k.env();

            process.env.NODE_ENV.should.eql('dev');
            process.env.BASIC.should.eql('basic');
            process.env.SOME_KEY.should.eql('jahbsd76asd867a7sdba87w293b927b9as');
            process.env.SOME_NAME.should.eql('cooljack');

            res.kconfig.should.be.an.Object;
            res.kconfig.should.be.empty;
        });

        it('.config() should return an empty object if no root config file present', function(){
            res = k.config();
            res.should.be.empty;
        });

        it('.config() should return a config object if name given', function(){
            param = 'settings';
            res = k.config(param);
            res.should.be.an.Object;
            res.should.eql(require('../' + param + '.json'));
        });

        it('.config() should return a config object if path given', function(){
            param = path.resolve(path.join(process.cwd(), 'test', 'config.json'));
            var res = k.config(param);
            res.should.be.an.Object;
            res.should.eql(require('./config.json'));
        });

        it('.boot() should set env and load empty config', function(){
            res = k.boot();

            process.env.NODE_ENV.should.eql('dev');
            process.env.BASIC.should.eql('basic');
            process.env.SOME_KEY.should.eql('jahbsd76asd867a7sdba87w293b927b9as');
            process.env.SOME_NAME.should.eql('cooljack');

            res.should.be.an.Object;
            res.should.be.empty;
        });
    });

});