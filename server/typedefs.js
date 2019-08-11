/**
 * @typedef {(string|number)} PhysicsObjectConfig
 * @property {number} [mass = 1] The mass of the object.
 * This parameter determines how the momentum affects on
 * the velocity of two colliding objects. It also affects on
 * braking speed of the object.
 * @property {number} [maxSpeed = 100] The maximum vector speed this
 * object can reach.
 * @property {number} [acceleration = 10] delta of the vector speed for
 * time unit.
 * @property {Shape} [shape = Rect] Shape of colliding body.
 * @property {SpeedObject} speed Current speed of the object in both
 * directions.
 */

/**
  * @typedef {(number)} SpeedObject
  * @property {number} x Horizontal speed
  * @property {number} y Vertical speed
  */

/**
  * @typedef {(number)} ControlsObject
  * @property {number} [vx = 0] Horizontal momentum
  * @property {number} [vy = 0] Vertical momentum
  */
