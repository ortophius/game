const PhysicsObject = require('./PhysicsObject');
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
   * @param {number} [x = 1] The X coordinate of Player
   * @param {number} [y = 0] The Y coordinate of Player
   * @param {number} id Player's ID
   * @param {Socket} socket The current `socket` which Player uses
   * @param {string} [name] Player's name
   */
  constructor(x, y, id, socket, name) {
    if (id == undefined) {
      throw new Error('You must specify player\'s ID!');
    };

    if (socket == undefined) {
      throw new Error('You must specify player\'s socket!');
    };

    super(x, y);
    this.name = name || defaultConfig.name;
    this.kills = 0;
    this.exp = 0;
    this.socket = socket;
    this.id = id;
    this.hp = 100;
  }
}

module.exports = Player;

