const Player = require('./Player');
const Game = require('./Game');
/**
 * Class of the main controllable player.
 */
class MainPlayer extends Player {
  /**
   * Create player
   * @param {number} x X position
   * @param {number} y Y position
   * @param {PIXI.Container} world A game world
   */
  constructor(x, y, world) {
    super(x, y, world);
    const _ = this;
    this.controls = {
      up: {code: 83, pressed: 0},
      down: {code: 87, pressed: 0},
      left: {code: 65, pressed: 0},
      right: {code: 68, pressed: 0},
    };

    this.keys = {};
    Object.keys(this.controls).map(function(key) {
      _.keys[_.controls[key].code] = key;
    });

    document.addEventListener('keydown', _.updateControls.bind(_));
    document.addEventListener('keyup', _.updateControls.bind(_));
  }

  /**
   * Update object physics accoring keyboard controls.
   * @param {Event} keyEvent Keyboard event
   */
  updateControls(keyEvent) {
    if (!(keyEvent.keyCode in this.keys)) return;
    if (keyEvent.repeat) return;
    const code = keyEvent.keyCode;
    const keys = this.keys;
    const controls = this.controls;
    const pressed = (keyEvent.type == 'keydown') ? 1 : 0;
    controls[keys[code]].pressed = pressed;

    const x = controls.right.pressed - controls.left.pressed;
    const y = controls.up.pressed - controls.down.pressed;

    this.acceleration.x = x;
    this.acceleration.y = y;

    Game.socket.emit('controls', this.acceleration);
  }
}

module.exports = MainPlayer;
