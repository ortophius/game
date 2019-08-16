const ComStack = require('../lib/CommandStack');
const Ticker = require('../lib/Ticker');

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
