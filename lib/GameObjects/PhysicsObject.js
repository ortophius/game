const GameObject = require('./GameObject');
const Geom = require('../Geom/index');
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
    this.speed = new Geom.Vector();
    this.acceleration = new Geom.Vector();
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
      accForce: 1,
      collide: false,
      speed: {
        x: 0,
        y: 0,
      },
      // shape: new Rect(1, 1),
    };

    // checks here...
    this.config = Object.assign(defConfig, config);
  }

  /**
   * Calculate physics parameters of the object and then
   * set new position to it.
   * @param {number} delta Time delta
   */
  update(delta) {
    const mSpeed = this.config.maxSpeed;

    const acc =
        this.acceleration
            .multiply(delta)
            .multiply(this.config.accForce);


    const speed = this.speed.add(acc);

    if (speed.length > mSpeed) speed.length = mSpeed;
    this.speed = speed;

    this.x = speed.x * delta;
    this.y = speed.y * delta;
  }
}

module.exports = PhysicsObject;
