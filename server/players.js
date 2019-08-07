/**
 * Methods for creating `Player` instances.
 * @namespace
 * */
const Players = {
  /** @property {Object} defaultConfig Default player configuration. */
  defaultConfig: {
    name: 'Bebop',
    kills: 0,
    deaths: 0,
  },

  playerList: require('./playerList.js'),

  /**
   * Get new `Player` object wit default config.
   * @function
   * @param {String} id Player ID
   * @param {String} name Player name
   * @param {String} socketId current player's `socket.id`
   * @return {Object}
   */
  createPlayer: function(id, name, socketId) {
    const newPlayer = {};
    Object.assign(newPlayer, defaultConfig);
    Object.assign(newPlayer, {
      name: name,
      id: id,
      socketId: socketId,
    });
    this.playerList.addPlayer(newPlayer);
    return newPlayer;
  },
};

module.exports = Players;
