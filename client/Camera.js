const PIXI = require('pixi.js');
const Game = require('./Game');
const GUI = require('./Gui');
/**
 * Class which provides game camera behaviour.
 */
class Camera extends PIXI.Container {
  /**
   * Create an instance
   * @param {PIXI.Container} world A game world container
   */
  constructor(world) {
    super();
    this.GUI = new GUI();
    this.world = world;
    this.addChild(world);
    this.followedObject = null;
    this.updateFunc = this.updateCameraPosition.bind(this);
  }

  /**
   * Start following an object
   * @param {PIXI.DisplayObject} object Object to follow
   */
  follow(object) {
    this.followedObject = object;
    Game.ticker.off('update', this.updateFunc);
    Game.ticker.on('update', this.updateFunc);
    console.log('Following '+object);
  }

  /**
   * Stop following any object
   */
  stopFollow() {
    this.followedObject = null;
    Game.ticker.off('update', this.updateFunc);
  }

  /**
   * Update camera position according following object
   */
  updateCameraPosition() {
    const targetPivot = new PIXI.Point(
        this.followedObject.x - Game.app.renderer.width / 2,
        this.followedObject.y - Game.app.renderer.height / 2,
    );
    this.world.pivot.copyFrom(targetPivot);
  }
}

module.exports = Camera;
