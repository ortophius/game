const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Player = require('./Player');
const Game = require('./Game');

/**
 * Class representing authority erver logic
*/
class Server {
  /**
   * Create an instance of the `Server`.
   * Should not be called directy.
   * @param {number} port TCP post to listen
   */
  constructor(port) {
    this.io = io;
    this.port = port;
    this.registerListeners();
    this.setUpExpress();
    this.startUpdating();
  }

  /**
   * Enable broadcasting information
   * to all clients.
   */
  startUpdating() {
    const _ = this;
    setInterval(_.sendUpdate.bind(_), 1000);
  }

  /**
   * Set up Express settings.
   * @private
   * @param {number} port Network port to listen
   */
  setUpExpress() {
    const port = this.port;
    app.use(express.static('dist'));

    app.get('/', function(req, res) {
      res.sendFile(__dirname + '/dist/index.html');
    });

    http.listen(port, function() {
      console.log(`listening on *: ${port}`);
    });
  }

  /**
   * Register event listeners for `Socket.io`
   */
  registerListeners() {
    const _ = this;
    _.io.on('connection', _.registerSocketListners.bind(_));
  }

  /**
   * Register event listeners for `Socket` instance.
   * @param {SocketIO.Socket} socket `Socket` instance
   */
  registerSocketListners(socket) {
    const _ = this;
    socket.on('start', _.newPlayer.bind(_, socket));
    socket.on('getPlayers', _.sendPlayers.bind(_, socket));
    socket.on('p-ing', function() {
      socket.emit('p-ong');
    });
  }

  /**
   * Send complete list of current players
   * @param {SocketIO.Socket} socket `Socket` instance
   */
  sendPlayers(socket) {
    const players = Game.players.map(function(p) {
      return {
        id: p.socket.id,
        name: p.name,
        x: p.x,
        y: p.y,
      };
    });
    socket.emit('getPlayersReply', players);
  }

  /**
   * Send updated positions of all objects
   * to clients.
   */
  sendUpdate() {
    if (Game.players.length == 0) return;

    const updateObject = Game.players.map(function(player) {
      return {id: player.socket.id, x: player.x, y: player.y};
    });

    io.emit('update', updateObject);
  }

  /**
   * Add a new player to game.
   * @param {SocketIO.Socket} socket Connection socket
   */
  newPlayer(socket) {
    const x = Math.floor(Math.random() * Game.worldConfig.width);
    const y = Math.floor(Math.random() * Game.worldConfig.height);
    const player = new Player(
        socket,
        Math.random(),
        'Bob',
        x,
        y);

    Game.players.push(player);
    const notifyInfo = {
      id: socket.id,
      x: player.x,
      y: player.y,
    };
    socket.emit('startReply', notifyInfo);
    socket.broadcast.emit('player:connected', notifyInfo);
  }
}

let instance = null;

/**
 * @ignore
 * @return {Server}
 */
function getInstance() {
  if (instance === null) instance = new Server(3000);
  return instance;
}

module.exports = getInstance();
