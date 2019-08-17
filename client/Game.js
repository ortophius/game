const PIXI = require('pixi.js');
const io = require('socket.io-client');
const Ticker = require('./Ticker');
/**
 * Contains all common objects for the client.
 * @namespace
 * @property {object} PIXI Reference to the `PIXI` namespace
 * @property {PIXI.Application} app Current `PIXI.Application` instance
 * It should be created manually.
 * @property {object} world Configuration of the current world.
 * Can be overwritten by the server.
 */
const Game = {
  appInstance: null,
  app: require('./App.js'),
  world: {
    width: 5000,
    height: 5000,
    stars: 2000,
  },
  assets: require('./assets/index.js'),
  events: new PIXI.utils.EventEmitter(),
  players: {},
  socket: io('localhost:3000'),
  ticker: new Ticker(60),
};

module.exports = Game;
