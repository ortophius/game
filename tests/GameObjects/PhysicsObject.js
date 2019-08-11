const should = require('chai').should();
const PhysicsObject = require('../../lib/GameObjects/PhysicsObject');
const Vector = require('../../lib/Geom/Vector');

describe('PhysicsBody', function() {
  it('Should conain proper config', function() {
    const p = new PhysicsObject();
    p.should.have.property('config');
    p.should.have.property('acceleration');
    p.should.have.property('speed');
    p.config.should.have.property('maxSpeed');
  });

  it('#update', function() {
    const p = new PhysicsObject(0, 0, {maxSpeed: 200, accForce: 10});

    p.acceleration.x = 1;
    p.update(1);
    p.speed.x.should.equal(10);

    p.acceleration.y = 1;
    p.update(1);
    p.speed.y.should.equal(10);

    p.acceleration = new Vector(-1, -1);
    p.update(1);
    p.speed.should.deep.equal({x: 10, y: 0});

    p.speed = new Vector();
    p.config.accForce = 400;
    p.acceleration = new Vector(1, 1);
    p.update(2);
    p.speed.length.should.be.within(199.99, 200.01);
  });
});
