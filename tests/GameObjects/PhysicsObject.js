require('chai').should();
const PhysicsObject = require('../../lib/GameObjects/PhysicsObject');

describe('PhysicsBody', function() {
  it('Should conain proper config', function() {
    const p = new PhysicsObject();
    p.should.have.property('config');
    p.should.have.property('acceleration');
    p.should.have.property('speed');
    p.config.should.have.property('maxSpeed');
  });

  it('#update', function() {
    const p = new PhysicsObject(0, 0, {maxSpeed: 200, accForce: 50});

    p.acceleration.x = 1;
    p.update(2);
    p.speed.x.should.equal(70);
    p.acceleration.x = -1;
    p.update(1);

    p.acceleration.x = 0;
    p.acceleration.y = 1;
    p.update(10);
    p.speed.x.should.equal(0);
    p.speed.y.should.equal(200);
  });
});
