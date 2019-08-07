/** Class representing players collection,
 * and providing interface to manipulate them.
 * @pivate @property {Object} players Object containing all the current players.
 * @private @property {Object} idReferences Object which stores `socket.id`
 * to `player.id` references.
 */
class PlayerList {
  /** Create playerList instance. */
  constructor() {
    this.players = {};
    this.idReferences = {};
  }

  /**
   * Get the player object by the socket.id
   * @param {String} socketId
   * @return {Object}
   */
  getPlayerBySocketId(socketId) {
    const player = this.players[socketId] || false;
    return player;
  }

  /**
   * Adds player to the current list.
   * @param {Object} player
   */
  addPlayer(player) {
    //  to do: a lot.
    this.players[player.socketId] = player;
  }

  /**
   * Removes player from the current list.
   * @param {String} socketId
   */
  removePlayer(socketId) {
    delete this.players[socketId];
  }

  /**
   * Removes all players.
   */
  removeAllPLayers() {
    this.players = {};
  }

  /**
   * Runs `func(player)` for each `player` in the current list.
   * @param {Function} func Function to execute for each player.
   * @param {Function} callback Will be called in the end of cycle.
   */
  all(func, callback) {
    const _ = this;
    const playerIds = Object.keys(_.players);
    if (playersIds.length == 0) return;
    playerIds.forEach((player) => {
      func(player);
    });

    if (callback !== undefined) callback();
  }
}

let instance = null;

/** @ignore */
function getInstance() {
  if (instance == null) instance = new PlayerList();
}

module.exports = getInstance();
