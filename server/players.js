const playerList = require('./playerList.js');
/**
 * Methods for creating `Player` instances.
 * @namespace
 * */
const Players = {
  /** @property {Object} defaultConfig Default player configuration */
  defaultConfig: {
    name: 'Bebop',
    kills: 0,
    deaths: 0,
  },

  /** @property {PlayerList} playerList List of current players */
  playerList: playerList,

  /**
   * Get new `Player` object with default config.
   * @function
   * @param {string} id Player ID
   * @param {string} name Player name
   * @param {string} socketId current player's `socket.id`
   * @return {Object}
   */
  createPlayer: function(id, name, socketId) {
    let newPlayer = Object.assign({}, defaultConfig);
    newPlayer = Object.assign(newPlayer, {
      name: name,
      id: id,
      socketId: socketId,
    });
    this.playerList.addPlayer(newPlayer);
    return newPlayer;
  },
};

module.exports = Players;
