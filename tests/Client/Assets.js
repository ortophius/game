require('chai').should();
const assets = require('../../client/assets/index');

describe('Assets', function() {
  it('#getAll', function() {
    const all = assets.getAll();
    all.length.should.be.above(0);
    all.forEach((item) => {
      item.should.be.a('string');
    });
  });
});
