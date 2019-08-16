require('chai').should();
const Vector = require('../../lib/Geom/Vector');

describe('Vector', function() {
  it('Should proper set default fields', function() {
    const v = new Vector();
    v.should.have.property('x');
    v.x.should.equal(0);
    v.y.should.equal(0);
  });

  it('Should create proper object', function() {
    const v = new Vector(1, 2);
    v.x.should.equal(1);
    v.y.should.equal(2);
  });

  it('Should proper get length', function() {
    const v = new Vector(3, 4);
    v.length.should.be.within(4.98, 5.01);
  });

  it('Should proper set length with positive components', function() {
    const v = new Vector(3, 4);
    v.length = 4;
    v.length.should.equal(4);
    v.x.should.be.above(0);
    v.y.should.be.above(0);
    v.x.should.be.below(3);
    v.y.should.be.below(4);
  });

  it('Should proper set length with negative components', function() {
    const v = new Vector(-3, -4);
    v.length = 4;

    v.length.should.equal(4);

    v.x.should.be.below(0);
    v.y.should.be.below(0);

    v.x.should.be.above(-3);
    v.y.should.be.above(-4);
  });

  it('Multiplying', function() {
    const v = new Vector(1, 5);
    v.multiply(3).should.deep.equal({x: 3, y: 15});
  });

  it('Addiction', function() {
    const v = new Vector(-2, 1);
    v.add(new Vector(5, -3)).should.deep.equal({x: 3, y: -2});
  });

  it('Substraction', function() {
    const v = new Vector(-2, 1);
    v.substract(new Vector(-5, 3)).should.deep.equal({x: 3, y: -2});
  });
});
