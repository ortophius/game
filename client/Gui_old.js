const Game = require('./Game');
const PIXI = require('pixi.js');

/**
 * Class which provides game GUI.
 */
class GUI {
  /**
   * Create an instance.
   * @throws {error}
   * If `app` not passed, it will try to use `Client.app`.
   * If `Client.app` is not defined, constructor will throw an error.
   * */
  constructor() {
    if (Game.app === undefined) {
      console.log(Game);
      throw new Error('You must define an application!');
    }

    this.debugText = new PIXI.Text('', {fill: '#FFFFFF'});
    this.app = Game.app;
  }

  /**
   * Clear the game screen.
   * It makes game just a black screen.
   * Really.
   */
  clearStage() {
    this.app.stage = new PIXI.Container();
  }

  /** Display the loading screen. */
  showLoadingScreen() {
    const text = new PIXI.Text('Loading...', {
      fill: 'white',
    });
    text.anchor.set(0.5, 0.5);
    text.x = this.app.screen.width / 2;
    text.y = this.app.screen.height / 2;
    this.app.stage.addChild(text);
  }

  /**
   * Show main menu.
   */
  showMainScreen() {
    const text = new PIXI.Text('Play!', {
      fill: 'white',
    });
    text.anchor.set(0.5, 0.5);
    text.x = this.app.screen.width / 2;
    text.y = this.app.screen.height / 2;

    text.interactive = true;
    text.buttonMode = true;

    text.on('pointerdown', () => {
      Game.events.emit('Start');
    });
    Game.app.stage.addChild(text);
  }

  /**
   * Create and show the game world.
   */
  showGameWorld() {
    const starCount = Game.world.stars;
    const starSprites = Game.assets.sprites.stars;
    for (let i = 0; i < starCount; i++) {
      const x = Math.floor(Math.random() * Game.world.width);
      const y = Math.floor(Math.random() * Game.world.height);
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
      Game.app.stage.addChild(star);
    }
  }

  /**
   * Print line in debug side of the window
   * @param {string} text text to display
   */
  // debug(text) {
  //   const debug = new PIXI.Text(text, {fill: '#FFFFFF'});
  //   debug.position = {x: -Game.app.stage.x, y: -Game.app.stage.y};
  // }
}

let instance = null;

/**
 * @ignore
 * @return {GUI}
 */
function getInstance() {
  if (instance == null) instance = new GUI();
  return instance;
}

module.exports = getInstance();
