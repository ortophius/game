require('chai').should();
const CommandStack = require('../lib/CommandStack');

describe('CommandStack', function() {
  let t = new CommandStack();
  const command = {
    controls: {
      acceleration: {
        x: 1,
        y: 0,
      },
    },
  };
  it('Should proper create instance', function() {
    (t.stack instanceof Array).should.be.equal(true);
    t.firstNum.should.be.a('number');
    t.lastNum.should.be.a('number');
  });

  it('#add', function() {
    t.add(command);

    t.lastNum.should.equal(1);
    t.stack.length.should.equal(1);
    t.stack[0].command.should.deep.equal(command);
  });

  it('#flush', function() {
    const stack = t.flush();
    stack.lastNum.should.equal(1);
    stack.firstNum.should.equal(0);
    stack.stack[0].command.should.deep.equal(command);

    t.stack.length.should.equal(0);
    t.lastNum.should.equal(1);
    t.firstNum.should.equal(1);
  });

  it('Create with custom stack', function() {
    t = new CommandStack({
      firstNum: 10,
      lastNum: 12,
      stack: [1, 'abc', {test: 'test'}],
    });

    t.lastNum.should.equal(12);
    t.firstNum.should.equal(10);
    t.stack[1].should.equal('abc');
  });

  it('#flush again', function() {
    t.flush();
    t.firstNum.should.equal(12);
    t.stack.length.should.equal(0);
  });
});
