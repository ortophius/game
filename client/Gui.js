const PIXI = require('pixi.js');
const Game = require('./Game');
/**
 * Class provides game GUI
 */
class GUI extends PIXI.Container {
  /**
   * Create an instance
   */
  constructor() {
    super();
    this.container = new PIXI.Container();
    this.container.x = 0;
    this.container.y = 0;
    this.addChild(this.container);

    this.debugText = new PIXI.Text('', {fill: '#FFFFFF'});
    this.debugText.anchor.set(0, 0);
    this.addChild(this.debugText);
    this.toDebug = [];
    Game.ticker.on('update', this.updateDebugInfo.bind(this));
  }

  /**
   * Show main menu
   */
  showMainMenu() {
    const text = new PIXI.Text('Play!', {fill: '#88FF88'});
    text.anchor.set(0.5);
    text.x = Game.app.renderer.width / 2;
    text.y = Game.app.renderer.height / 2;
    text.interactive = true;
    text.buttonMode = true;
    text.on('pointerdown', function() {
      Game.events.emit('core:start');
    });
    this.container.addChild(text);
  }

  /**
   * Clear the interface
   */
  clear() {
    this.removeChild(this.container);
    this.container = new PIXI.Container();
    this.addChild(this.container);
  }

  /**
   * Show debug info
   * @param {object} obj
   * @param {string} propName
   */
  debug(obj, propName) {
    this.toDebug.push({obj: obj, propName: propName});
  }

  /**
   * Update debug text
   */
  updateDebugInfo() {
    const _ = this;
    _.debugText.text = '';
    _.toDebug.forEach(function(debug) {
      const obj = debug.obj;
      const propName = debug.propName;
      _.debugText.text += `${propName}: ${obj[propName]}\n`;
    });
  }
}

module.exports = GUI;
