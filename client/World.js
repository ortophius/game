const PIXI = require('pixi.js');
const Game = require('./Game');
/**
 * Game World
 */
class World extends PIXI.Container {
  /**
   * Create an instance
   * @extends {PIXI.Container}
   * @param {object} worldConfig World config
   */
  constructor(worldConfig) {
    super();
    this.config = worldConfig;
    this.build();
  }

  /**
   * Build world
   */
  build() {
    const starCount = this.config.stars;
    const starSprites = Game.assets.sprites.stars;
    for (let i = 0; i < starCount; i++) {
      const x = Math.floor(Math.random() * this.config.width);
      const y = Math.floor(Math.random() * this.config.height);
      const spriteNum = Math.floor(Math.random() * (starSprites.length - 1 ));
      const sprite = starSprites[spriteNum];
      const star = new PIXI.Sprite(
          Game
              .app
              .loader
              .resources[`assets/sprites/stars/${sprite.src}`]
              .texture
      );
      star.position = new PIXI.Point(x, y);
      this.addChild(star);
    }
  }
}

module.exports = World;
