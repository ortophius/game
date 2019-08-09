const expect = require('chai').expect;
const should = require('chai').should();
const path = require('path');


describe('GameObjects', function() {
  const GameObjects = require(path.resolve(__dirname, 'GameObjects', 'index'));

  it('Should contain certain fields.', function() {
    GameObjects.should.have.property('GameObject');
    GameObjects.should.have.property('Player');
    // GameObjects.should.have.property('Bullet');
    // GameObjects.should.have.property('PhysicsObject');
  });
});

describe('GameObject', function() {
  const GameObject = require(path.resolve(__dirname, 'GameObjects', 'GameObject'));

  it('Should proper set default values', function() {
    const testObject = new GameObject();
    testObject.x.should.equal(0);
    testObject.y.should.equal(0);
  });

  it('Should proper set coordinates', function() {
    const testObject = new GameObject(-7281, 9209690.1);
    testObject.x.should.equal(-7281);
    testObject.y.should.equal(9209690.1);
  });

  it('Should proper set angles', function() {
    const testObject = new GameObject();
    testObject.setDegreeAngle(540);
    testObject.angle.should.equal(Math.PI);
    
    testObject.setRadianAngle(Math.PI);
    testObject.angle.should.equal(Math.PI);
  });
});

describe('Player', function() {
  const GameObject = require(path.resolve(__dirname, 'GameObjects', 'GameObject'));
  const Player = require(path.resolve(__dirname, 'GameObjects', 'Player'));

  it("Should proper set fields", function() {
    const player = new Player(1441, -2637, 'testID', { })
    player.x.should.equal(1441);
    player.y.should.equal(-2637);
    player.id.should.equal('testID');
    player.socket.should.deep.equal({ });
    player.hp.should.equal(100);
    player.config.should.be.a("object");
  });
});

describe('PhysicsObject', function() {
  const PhysicsObject = require(path.resolve(__dirname, 'GameObjects', 'PhysicsObject'));

  it('Should contain physics properties', function(){
    const testObject = new PhysicsObject();
    const config = testObject.config;
    config.should.have.property("mass");
    config.should.have.property("acceleration");
    config.should.have.property("maxSpeed");
    config.speed.should.have.property("x");
    config.speed.should.have.property("y");
  });

  it('Should proper set physics properties', function(){
    const inputConfig = {
      mass: 9.8531,
      acceleration: 213,
      maxSpeed: -2860,
      speed: {
        x: 213.0865,
        y: -7999659.14,
      },
    };

    const properConfig = {
      mass: 9.8531,
      acceleration: 213,
      maxSpeed: -2860,
      speed: {
        x: 213.0865,
        y: -7999659.14,
      },
    };

    testObject = new PhysicsObject(0, 0, inputConfig);
    const config = testObject.config;
    config.mass.should.equal(properConfig.mass);
    config.acceleration.should.equal(properConfig.acceleration);
    config.maxSpeed.should.equal(properConfig.maxSpeed);
    config.speed.x.should.equal(properConfig.speed.x);
    config.speed.y.should.equal(properConfig.speed.y);
  });
});
