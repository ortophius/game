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
   */
  constructor(x, y) {
    super(x, y, Game.ticker);
    const _ = this;
    const sprite = new PIXI.Sprite(
        Game.app.loader.resources[
            `assets/sprites/ships/default.png`
        ].texture
    );
    sprite.position = new PIXI.Point(x, y);
    Game.app.stage.addChild(sprite);
    this.sprite = sprite;

    // It is really, REALLY DUMB.
    // I know.
    // It is kinda big mustake in architecture.
    // I will fix it.
    // I promise.
    Game.ticker.on('update', function() {
      _.sprite.position = new PIXI.Point(_.x, _.y);
    });
  }
}

module.exports = Player;
