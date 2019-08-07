const Cookies = require('js-cookie');

/**
 * Provides utilites for communicating the authority server.
 * @property {String} id - Player ID
 * @property {Soket.io} io - A Socket.io client instance
 * */
class Network {
  /** Create a instance of Network class. */
  constructor() {
    this.io = require('socket.io-client')();
    this.id = null;
    this.checkId(Cookies.get('id'));
  }

  /**
  * Sets new ID to a player.
  * @param {String} id
  */
  setId(id) {
    this.id = id;
    Cookies.set('id', id);
  }

  /**
   * Sending the ID from client to server for verifying.
   * @param {String} id
   */
  async checkId(id) {
    const _ = this;
    console.log('id is: '+id);
    if (typeof(id) !== 'string') this.setId(await this.queryId());
    else {
      this.io.once('checkIdReply', verifyId);
      this.io.emit('checkId', id);
    }

    /**
     * @private
     * @function
     * @param {Boolean} state
     */
    function verifyId(state) {
      if (state) _.setId(id);
    }
  }

  /**
   * Sending the request for a new ID to a server.
   * @return {Promise}
   */
  queryId() {
    const _ = this;
    console.log('querying id');

    return new Promise(function(resolve, reject) {
      _.io.once('getNewIdReply', function(id) {
        _.checkId(id);
      });

      _.io.emit('getNewId');
    });
  }
}

/**
 * @return {Network} instance of Network
 */
function getInstance() {
  if (instance == null) instance = new Network();
  return instance;
}

let instance = null;

module.exports = getInstance();
