'use strict';

const names = require('./names');

const planetBiomes = ['terran', 'jungle', 'ocean', 'desert', 'arid', 'barren', 'dead', 'toxic', 'radiated'];

exports.generate = function(rng) {
  let star = {}, roll;

  // Pick random name
  star.name = names.star(rng);

  // Pick random stellar type according to preponderance
  roll = rng.int(100);
  if (roll < 60) {
    star.type = 'M';
  } else if (roll < 75) {
    star.type = 'K';
  } else if (roll < 82) {
    star.type = 'G';
  } else if (roll < 86) {
    star.type = 'F';
  } else if (roll < 90) {
    star.type = 'A';
  } else if (roll < 95) {
    star.type = 'B';
  } else {
    star.type = 'O';
  }

  // Pick planet biome
  star.biome = rng.pick(planetBiomes);

  // Pick planet bonus if applicable
  roll = rng.int(100);
  if (roll < 90) {
    star.bonus = 'none';
  } else if (roll < 95) {
    star.bonus = 'production';
  } else {
    star.bonus = 'research';
  }

  return star;
}
