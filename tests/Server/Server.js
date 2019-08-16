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
        s.disconnect();
      });
    }
  });

  it('Sending updates to all players correctly', function(done) {
    const client1 = io.connect(url, options);
    const client2 = io.connect(url, options);
    const testControls = {x: 1, y: 0};

    client2.on('commands', function(controls) {
      const acc = controls.stack[0].command.acceleration;
      const id = controls.stack[0].command.id;
      acc.should.deep.equal(testControls);
      id.should.equal(client1.id);
      done();
    });

    client1.emit('controls', testControls);
  });
});
