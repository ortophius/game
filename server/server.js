/**
 * @constructor
 * @param {socket.io.Socket} socket
 */
function Server(socket) {
  this.socket = socket;
  this.id = null;
  this.db = null; // Ill do that later
  this.registerListeners();
  this.socket.on('getNewId', function() {
    console.log('test');
  });
}

/**
 * @async
 * @function checkId
 * @param {String} id
 */
Server.prototype.checkId = async function(id) {
  const _ = this;

  // let check = await _.db.checkId(id)
  let check = true;
  if (typeof(check) !== 'boolean') check = false;

  _.socket.emit('checkIdReply', check);
};

/**
 * Creates and assigning new ID to user
 * @function setNewId
 */
Server.prototype.setNewId = function() {
  const id = this.createId();
  this.id = id;
  console.log('Creating player '+id);
  // this.db.createPlayer(id)
  this.socket.emit('getNewIdReply', id);
};

/**
 * Geterates random string for new ID
 * @function createId
 * @return {String}
 */
Server.prototype.createId = function() {
  let id = '';
  let randomAscii;
  const stringLength = 16;
  for (let i = 0; i < stringLength; i++) {
    randomAscii = Math.floor((Math.random() * 25) + 97);
    id += String.fromCharCode(randomAscii);
  }
  return id;
};

/**
 * Register listeners for all common events
 * @function registerListeners
 */
Server.prototype.registerListeners = function() {
  const _ = this;
  this.socket.on('getNewId', _.setNewId.bind(_));
  this.socket.on('checkId', _.checkId.bind(_));
};

module.exports = Server;
