'use strict';

const seedrandom = require('seedrandom');
const crypto = require('crypto');

exports.randomSeed = function() {
  return crypto.randomBytes(10).toString('hex');
}

exports.seed = function(seed) {
  return {
    rng: seedrandom(seed),
    seed: seed,
    int: function(max, min) {
      return Math.abs(this.rng.int32()) % max + (min || 0);
    },
    pick: function(array) {
      return array[this.int(array.length)];
    }
  }
}
