const {performance} = require('perf_hooks');
const EventEmitter = require('events');

/**
 * Server side Time ticker.
 * Used to update things in time.
 * @extends {EventEmitter}
 * @property {number} fps The current game FPS.
 */
class Ticker extends EventEmitter {
  /**
   * Create an instance of Ticker.
   * Should not be called directly.
   * @param {Ticker} fps Desired FPS.
   */
  constructor(fps) {
    super();
    this.setMaxListeners(0);
    this.desiredFPS = fps || 40;
    this.lastTime = performance.now();
    this.resume();
  }

  /**
   * Emit an `update` events on all
   * subscribers.
   * It passes the `delta` time elapsed
   * from the last update.
   * */
  update() {
    const delta = (performance.now() - this.lastTime) / 1000;
    this.lastTime = performance.now();
    this.emit('update', delta);
  }

  /** Resume the updating cycle */
  resume() {
    this.lastTime = performance.now();
    const _ = this;
    setInterval(_.update.bind(_), 1000/this.desiredFPS);
  }

  /** Pause the updating cycle */
  pause() {
    const _ = this;
    clearInterval(_.update.bind(_));
  }

  /**
   * @ignore
   * @param {number} value
   */
  set fps(value) {
    this.pause();
    this.desiredFPS = value;
    this.resume();
  }
}

module.exports = Ticker;
