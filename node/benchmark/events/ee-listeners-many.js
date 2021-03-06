'use strict';
var common = require('../common.js');
var EventEmitter = require('events').EventEmitter;

var bench = common.createBenchmark(main, {n: [5e6]});

function main(conf) {
  var n = conf.n | 0;

  var ee = new EventEmitter();
  ee.setMaxListeners(101);

  for (var k = 0; k < 50; k += 1) {
    ee.on('dummy0', function() {});
    ee.on('dummy1', function() {});
  }

  bench.start();
  for (var i = 0; i < n; i += 1) {
    var dummy = (i % 2 === 0) ? 'dummy0' : 'dummy1';
    ee.listeners(dummy);
  }
  bench.end(n);
}
