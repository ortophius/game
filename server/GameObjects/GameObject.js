/**
 * The base class that all Game Objects extend.
 * Should not be created directly.
 * @memberof GameObjects
 */
class GameObject {
  /**
   * Create an instance of GameObject
   * @param {number} [x = 0] The X coordinate of the object
   * @param {number} [y = 0] The Y coordinate of the object
   * */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.angle = 0;
  };

  /**
   * Sets the angle of this object in radians.
   * @param {number} angle The angle in radians
   */
  setRadianAngle(angle) {
    this.angle = angle;
  }

  /**
   * Sets the angle of this object in degress.
   * @param {number} angle The angle in degrees
   */
  setDegreeAngle(angle) {
    this.angle = (angle % 360) * (Math.PI / 180);
  }
}

module.exports = GameObject;

