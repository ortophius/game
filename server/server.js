/**
 * Class representing authority erver logic
*/
class Server {
  /**
   * Create an instance of the `Server`
   * @param {Socket.io} io `Socket.io` instance
   */
  constructor(io) {
    this.io = io;
  }

  /**
   * Register listeners for all common events
   * @param {Socket} socket
   */
  registerListeners(socket) {
    const _ = this;
    _.io.on('getNewId', setArguments(_.setNewId));
    _.io.on('checkId', setArguments(_.checkId));

    /**
     * @private
     * @param {Function} func
     * @return {Function}
    */
    function setArguments(func) {
      const newFunc = function(data) {
        func.call(_, socket, data);
      };
      return newFunc;
    }
  }

  /**
   * Sets ID for the new player.
   * @param {Socket} socket
   */
  setNewId(socket) {
    const _ = this;
    const newId = _.createId();
    // ... add player to the db
    socket.emit('setNewIdReply', newId);
  }

  /**
   * Geterates random string for new ID
   * @return {String}
   */
  createId() {
    let id = '';
    let randomAscii;
    const stringLength = 16;
    for (let i = 0; i < stringLength; i++) {
      randomAscii = Math.floor((Math.random() * 25) + 97);
      id += String.fromCharCode(randomAscii);
    }
    return id;
  }
}

module.exports = Server;
