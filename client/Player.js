const PhysicsObject = require('../lib/GameObjects/PhysicsObject');
const PIXI = require('pixi.js');
const Game = require('./Game');
/**
 * Player class.
 */
class Player extends PhysicsObject {
  /**
   * Create new player
   * @param {number} x X position
   * @param {number} y Y position
   * @param {PIXI.Container} world A game world
   */
  constructor(x, y, world) {
    super(x, y, Game.ticker);
    const _ = this;

    const res = Game.app.loader.resources;
    const spriteBase = 'assets/sprites/ships/';
    this.sprite = new PIXI.Sprite(res[spriteBase + 'default.png'].texture);
    this.world = world;
    this.sprite.position = new PIXI.Point(x, y);
    this.world.addChild(this.sprite);
    this.updateSprite = this.updateSpriteFunc.bind(this);
    // This is really, REALLY DUMB.
    // I know.
    // It is kinda big mistake in architecture.
    // I will fix it.
    // I promise.
    Game.ticker.on('update', this.updateSprite);
  }

  // /**
  //  * Register common listeners
  //  */
  // registerListeners() {
  //   const _ = this;
  //   Game.socket.on('update', _.updatePos.bind(_));
  // }

  /**
   * Update sprite position according physics
   */
  updateSpriteFunc() {
    this.sprite.position = new PIXI.Point(this.x, this.y);
  }

  /**
   * Removes this player from the game
   */
  remove() {
    this.world.removeChild(this.sprite);
    Game.ticker.off('update', this.updateSprite);
    this.cleanup();
    delete Game.players[Game.socket.id];
  }
}

module.exports = Player;
