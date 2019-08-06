const Cookies = require('js-cookie');

/**
 * Provides utilites for communicating the authority server
 * @constructor
 */
function Network() {
  this.io = require('socket.io-client')();
  this.id = null;
  this.checkId(Cookies.get('id'));
}

/**
 * Sets new ID to a player
 * @function
 * @param {String} id
 */
Network.prototype.setId = function(id) {
  this.id = id;
  Cookies.set('id', id);
};

Network.prototype.checkId = async function(id) {
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
};

/**
 * @function queryId
 * @return {Promise}
 */
Network.prototype.queryId = function(){
    let _ = this
    console.log("querying id")
    return new Promise(function(resolve, reject){
        _.io.once('getNewIdReply', function(id){ _.checkId(id) })
        _.io.emit('getNewId')
    })
}

function getInstance() {
    if (instance == null) instance = new Network()
    return instance
}

let instance = null;

module.exports = getInstance()