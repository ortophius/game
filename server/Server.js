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
    setInterval(_.sendUpdate.bind(_), 1000/10);
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
    _.io.on('connection', _.newPlayer.bind(_));
  }

  /**
   * Sends updated information about all
   * game objects to clients. */
  sendUpdate() {
    if (Game.comStack.length == 0) return;
    const stack = Game.comStack.flush();
    this.io.emit('commands', stack);
  }

  /**
   * Add a new player to game.
   * @param {SocketIO.Socket} socket Connection socket
   */
  newPlayer(socket) {
    Game.players.push(
        new Player(
            socket,
            Math.random(),
            'Bob'));
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
