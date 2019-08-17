const Game = require('./Game');
/**
 * Class which provides game camera behaviour.
 */
class Camera {
  /**
   * Create an instance of `Camera`.
   * @param {PIXI.DisplayObject} [object] Object to follow
   */
  constructor(object) {
    console.log('creating camera');
    if (object === undefined) return;
    this.followedObject = object;
    this.stage = object.parent;
    this.anchor = {x: 0.5, y: 0.5};
    Game.ticker.on('update', this.update.bind(this));
  }

  /**
   * Sets object to follow.
   * @param {PIXI.DisplayObject} object Object to follow
   */
  follow(object) {
    this.followedObject = object;
  }

  /**
   * Update camera position relative
   * to folowed object.
   */
  update() {
    if (this.followedObject === undefined) return;
    this.moveTo(this.followedObject.x, this.followedObject.y);
  }

  /**
   * Move camera to position
   * @param {*} x X position
   * @param {*} y Y position
   */
  moveTo(x, y) {
    this.stage.x = window.innerWidth * this.anchor.x -x;
    this.stage.y = window.innerHeight * this.anchor.y -y;
    console.log(this.followedObject.x);
  }
}

module.exports = Camera;
