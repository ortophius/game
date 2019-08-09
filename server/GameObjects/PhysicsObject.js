const GameObject = require('./GameObject');
/**
 * Class representing server-side physics bodies.
 * @memberof GameObjects
 * @extends GameObject
 * @property {PhysicsObjectConfig} config Configuration of the physics object
 */
class PhysicsObject extends GameObject {
  /**
   * @param {Number} x The X coordinate of the object
   * @param {Number} y The Y coordinate of the object
   * @param {PhysicsObjectConfig} config Configuration of physics body
   */
  constructor(x, y, config) {
    super(x, y);
    this.assignConfig(config);
  }

  /**
   * Assign new physics config to physics object.
   * @param {PhysicsObjectConfig} config
   */
  assignConfig(config) {
    const defConfig = {
      mass: 1,
      maxSpeed: 100,
      acceleration: 1,
      speed: {
        x: 0,
        y: 0,
      },
      // shape: new Rect(1, 1),
    };

    // checks here...
    this.config = Object.assign(defConfig, config);
  }
}

module.exports = PhysicsObject;
