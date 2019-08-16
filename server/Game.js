const ComStack = require('../lib/CommandStack');
const Ticker = require('../lib/Ticker');

/**
 * Main server-side namespace including all
 * common objects and references.
 * @namespace
 * @property {CommandStack} comStack `CommandStack` instance.
 * @property {Array} players Array of current players
 * @property {Ticker} ticker `Ticker` instance.
 */
const Game = {
  comStack: new ComStack(),
  players: [],
  worldConfig: {
    width: 5000,
    height: 5000,
    port: 3000,
  },
  ticker: new Ticker(60),
};

module.exports = Game;
