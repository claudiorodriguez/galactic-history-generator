'use strict';

const seedrandom = require('seedrandom');
const crypto = require('crypto');

exports.generate = function(seed) {
  if (!seed) {
    seed = crypto.randomBytes(10).toString('hex');
  }
  const rng = seedrandom(seed);

  let civilization = {};

  return civilization;
}
