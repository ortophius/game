const Game = require('./Game');
const GUI = require('./Gui');
const Player = require('./Player');
const Camera = require('./Camera');
/**
 * Main client class which manages all common
 * processes.
 */
class Client {
  /**
   * Initialize the game.
   */
  constructor() {
    document.body.appendChild(Game.app.view);
    this.preload();
  }

  /**
   * Preload the necessary assets
   */
  preload() {
    GUI.showLoadingScreen();
    const loader = Game.app.loader;
    loader.add(Game.assets.getAll());
    loader.load(this.onAssetsLoaded.bind(this));
  }

  /**
   * Manage application after loading
   * all necessary resources.
   */
  onAssetsLoaded() {
    Game.events.on('Start', this.startGame.bind(this));
    GUI.clearStage();
    GUI.showMainScreen();
  }

  /**
   * Finally start the game!
   */
  startGame() {
    GUI.clearStage();
    GUI.showGameWorld();
  }
}

new Client();
