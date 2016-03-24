'use strict';

const rngGen = require('./rng');
const distance = require('euclidean-distance');

const star = require('./star');
const names = require('./names');

function generateStar (stars, minAllowableDist, width, height, rng) {
  let j, randX, randY, minDist = 0, retries = 0, prevStar, dist;

  while (minDist < minAllowableDist && retries < 10) {
    randX = rng.int(width - 10) + 5;
    randY = rng.int(height - 10) + 5;
    minDist = 0;
    for (j = 0; j < stars.length; j++) {
      prevStar = stars[j];
      dist = distance([prevStar.x, prevStar.y], [randX, randY]);
      if (minDist === 0 || dist < minDist) {
        minDist = dist;
      }
    }
    retries++;
  }

  let newStar = star.generate(rng);
  newStar.x = randX;
  newStar.y = randY;

  return newStar;
}

exports.generate = function(seed, rng) {
  if (!rng) {
    if (!seed) {
      seed = rngGen.randomSeed();
    }
    rng = rngGen.seed(seed);
  }
  if (!seed && rng) {
    seed = rng.seed;
  }

  // Galaxy parameters
  const width = 256;
  const height = 256;
  const starCount = 50;
  const minAllowableDist = 10;

  let stars = [], newStar;
  let i;

  // Generate empty stars
  for (i = 0; i < starCount; i++) {
    stars.push(generateStar(stars, minAllowableDist, width, height, rng));
  }

  // Return galaxy

  let galaxy = {
    seed: seed,
    stars: stars,
    width: width,
    height: height,
    name: names.galaxy(rng)
  };

  return galaxy;
}
