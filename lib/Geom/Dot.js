/**
 * Class representing a geometric dot.
 * @memberof Geom
 * @property {number} x X porition
 * @property {number} y Y position
 */
class Dot {
  /**
   * Create an instance of the dot.
   * @param {number} x X position
   * @param {number} y Y position
   */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

module.exports = Dot;
