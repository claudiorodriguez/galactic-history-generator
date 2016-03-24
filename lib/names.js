'use strict';

const natural = require('natural');
const nounInflector = new natural.NounInflector();
const changeCase = require('change-case');

const nounList = require('./words/nouns');
const adjectiveList = require('./words/adjectives');
const greekList = require('./words/greek');
const hebrewList = require('./words/hebrew');
const natoList = require('./words/nato');

function adjective (rng) {
  return rng.pick(adjectiveList);
}

function noun (rng) {
  return rng.pick(nounList);
}

function nouns (rng) {
  return nounInflector.pluralize(noun(rng));
}

function starParticle (rng) {
  return rng.pick(rng.pick([greekList, hebrewList, natoList]));
}

function starName (rng) {
  return ucf(starParticle(rng)) + ' ' + ucf(starParticle(rng));
}

function ucf (str) {
  return changeCase.upperCaseFirst(str);
}

exports.galaxy = function(rng) {
  let name;
  switch(rng.int(2)) {
    case 0:
      return 'The ' + ucf(adjective(rng)) + ' ' + ucf(noun(rng));
    case 1:
      return ucf(adjective(rng) + nouns(rng));
  }
}

exports.star = function(rng) {
  return starName(rng);
}
