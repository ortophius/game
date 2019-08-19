const Game = require('./Game');
const PhysicsObject = require('../lib/GameObjects/PhysicsObject');
const defaultConfig = {
  name: 'Bebop',
};

/**
 * @classdesc Class representing player on the server side.
 * @memberof GameObjects
 * @extends GameObject
 */
class Player extends PhysicsObject {
  /**
   * Creates an instance of the Player.
   * @param {Socket} socket The current `socket` which Player uses
   * @param {number} id Player's ID
   * @param {string} [name] Player's name
   * @param {number} [x = 1] The X coordinate of Player
   * @param {number} [y = 0] The Y coordinate of Player
   */
  constructor(socket, id, name, x, y) {
    if (id == undefined) {
      throw new Error('You must specify player\'s ID!');
    };

    if (socket == undefined) {
      throw new Error('You must specify player\'s socket!');
    };

    super(x, y, Game.ticker);
    this.socket = socket;
    this.registerListeners();

    this.id = id || Math.random();
    this.name = name || defaultConfig.name;

    this.kills = 0;
    this.exp = 0;
    this.id = id;
    this.hp = 100;

    const notifyObject = {
      name: this.name,
      id: this.socket.id,
    };

    socket.broadcast.emit('connected', notifyObject);
  }

  /**
   * @private
   */
  registerListeners() {
    const _ = this;
    _.socket.on('controls', _.controls.bind(_));
    _.socket.on('p-ing', _.pong.bind(_));
    _.socket.on('disconnect', _.disconnect.bind(_));
    _.socket.on('getPlayers', _.sendPlayers.bind(_));
  }

  /**
   * Send list of current players
   */
  sendPlayers() {
  }
  /**
   * @private
   * @param {Vector} controls Controls object
   */
  controls(controls) {
    if (controls === undefined) return;
    if (controls.x === undefined) return;
    if (controls.y === undefined) return;
    this.acceleration.x = Math.sign(controls.x);
    this.acceleration.y = Math.sign(controls.y);

    const command = {
      id: this.socket.id,
      acceleration: this.acceleration};

    this.socket.broadcast.emit('command', command);
  }

  /**
   * You can use this method to check
   * if the server is alive.
   */
  pong() {
    this.socket.emit('p-ong');
  }

  /**
   * Cleaning up after disconnecting.
   */
  disconnect() {
    Game.players.splice(
        Game.players.indexOf(this),
        1
    );
    this.cleanup();
    // console.log(`${this.id} disconnected.`);
  }
}

module.exports = Player;

