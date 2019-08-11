const Dot = require('./Dot');
/**
 * Class representing geometrical vector.
 * @memberof Geom
 * @extends Dot
 * @property {number} x X component
 * @property {number} y Y component
 */
class Vector extends Dot {
  /**
   * Create an instance of the Vector.
   * @param {*} x X component
   * @param {*} y Y component
   */
  constructor(x, y) {
    super(x, y);
  }

  /**
   * Vector angle
   * @return {number} Angle in radians
   */
  get angle() {
    return Math.atan(this.y / this.x);
  }

  /**
   * Vector length. You can set it manually, so its
   * components will be changed automatically, leaving
   * vector angle unchanged.
   * @param {number} len New length of the vector.
   * @return {object} New components of the vector.
   */
  set length(len) {
    const angle = this.angle * (180 / Math.PI);
    this.x = len * Math.sin(angle);
    this.y = len * Math.cos(angle);
    return {
      x: this.x,
      y: this.y,
    };
  }
  /**
   * Length setter.
   * @return {number} length of the vector
   * @ignore
   */
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  /**
   * Add another vector to this.
   * @param {Vector} vector Vector to add
   * @return {Vector} Result
   */
  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  /**
   * Substract another vector from this.
   * @param {Vector} vector Vector to substract
   * @return {Vector} Result
   */
  substract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  /**
   * Multiply vector by a scalar number.
   * @param {number} scalar Some scalar number
   * @return {Vector} Result
   */
  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}

module.exports = Vector;
