require('chai').should();
require('../../server/Server');
const sinon = require('sinon');
const Game = require('../../server/Game');

const url = 'http://localhost:3000';
const options = {
  'multiplex': false,
  'forceNew': true,
  'force new connection': true,
};
const io = require('socket.io-client');

afterEach(function() {
  sinon.restore();
});

describe('Server', function() {
  it('#on and #emit', function(done) {
    const socket = io.connect(url, options);
    socket.on('p-ong', function() {
      socket.disconnect();
      done();
    });

    socket.emit('p-ing');
  });

  it('Players adding/removing', function(done) {
    let pushes = 0;
    let splices = 0;

    sinon.replace(Game.players, 'push', function() {
      pushes ++;
    });

    sinon.replace(Game.players, 'splice', function() {
      splices++;
      if (splices == 5 && pushes == 5) done();
    });

    for (let i = 0; i < 5; i++) {
      const s = io.connect(url, options);
      s.on('connect', function() {
        s.emit('start');
        s.disconnect();
      });
    }
  });

  it('Notify about player connected', function() {
    // const cb = sinon.spy();
    const cb = function(obj) {
      console.log(obj);
    };
    const client1 = io.connect(url, options);
    client1.on('connected', cb);

    const client2 = io.connect(url, options);
    client2.on('connected', cb);

    client2.on('disconnect', function() {
      done();
    });

    client1.disconnect();
    client2.disconnect();
  });

  it('Sending commands to all players correctly', function(done) {
    const client1 = io.connect(url, options);
    const client2 = io.connect(url, options);
    const testControls = {x: 1, y: 0};

    client1.emit('start');
    client2.emit('start');

    client2.on('command', function(controls) {
      const acc = controls.acceleration;
      const id = controls.id;
      acc.should.deep.equal(testControls);
      id.should.equal(client1.id);
      client1.disconnect();
      client2.disconnect();
      done();
    });

    client1.emit('controls', testControls);
  });

  // it('Sending updates correctly', function(done) {
  //   Game.players = [];
  //   Game.players.length.should.equal(0);

  //   const client1 = io.connect(url, options);
  //   const client2 = io.connect(url, options);
  //   const testControls = {x: 1, y: 0};

  //   client1.emit('start');
  //   client2.emit('start');

  //   client1.o
  //   client2.on('update', function(update) {
  //     if (update[0].x > 0) done();
  //     // update[0].x.should.be.above(0);
  //     console.log(update);
  //     client1.disconnect();
  //     client2.disconnect();
  //     // done();
  //   });
  // });
});
