const Game = require('./Game');
const GUI = require('./Gui');
const MainPlayer = require('./MainPlayer');
const Player = require('./Player');
const Camera = require('./Camera');
const World = require('./World');

/**
 * Main client class which manages all common
 * processes.
 */
class Client {
  /**
   * Initialize the game.
   */
  constructor() {
    document.body.appendChild(Game.app.view);
    Game.app.loader
        .add(Game.assets.getAll())
        .load(this.afterPreload.bind(this));
  }

  /**
   * Manage game after preloading resources
   */
  afterPreload() {
    this.world = new World({
      width: 5000,
      height: 5000,
      stars: 2000,
    });
    this.camera = new Camera(this.world);
    this.GUI = new GUI();
    this.camera.addChild(this.GUI);
    Game.app.stage.addChild(this.camera);
    this.GUI.showMainMenu();
    Game.events.once('core:start', this.onStart.bind(this));
    this.registerPlayerEvents();

    Game.socket.once('getPlayersReply', this.onPlayerList.bind(this));
    Game.socket.emit('getPlayers');
  }

  /**
   * Do things after player clicked 'Play'
   */
  onStart() {
    const _ = this;
    Game.socket.once('startReply', function(conf) {
      _.GUI.clear();

      const player = new MainPlayer(conf.x, conf.y, _.world);

      Game.players[Game.socket.id] = player;
      _.camera.follow(player);
      _.GUI.debug(player, 'x');
    });
    Game.socket.emit('start');
  }

  /**
   * Register common players events
   * (`update`, `command`)
   */
  registerPlayerEvents() {
    const socket = Game.socket;
    socket.on('update', this.onUpdate.bind(this));
    socket.on('command', this.onCommand.bind(this));
  }

  /**
   * Update players positions from server information
   * @param {Array} updateObj Array of updated players positions
   */
  onUpdate(updateObj) {
    // console.log(updateObj);
    if (!(updateObj instanceof Array)) return;
    updateObj.forEach(function(upd) {
      if (Game.players[upd.id] === undefined) return;
      const player = Game.players[upd.id];
      if (Math.abs(upd.x - player.x) > 3) player.x = upd.x;
      if (Math.abs(upd.x - player.x) > 3) player.y = upd.y;
    });
  }

  /**
   * Apply others players commands
   * @param {object} command Command object
   */
  onCommand(command) {
    console.log(command);
    if (Game.players[command.id] == undefined) return;
    const player = Game.players[command.id];
    player.acceleration.x = command.acceleration.x;
    player.acceleration.y = command.acceleration.y;
  }
  /**
   * Add all players to world
   * @param {Array} list List of players
   */
  onPlayerList(list) {
    const _ = this;
    if (!(list instanceof Array)) return;
    list.forEach(function(player) {
      Game.players[player.id] = new Player(player.x, player.y, _.world);
    });

    const playerToFollow = _.getRandomPlayer();
    if (!playerToFollow) return;
    _.camera.follow(playerToFollow);
  }

  /**
   * Get random players
   * @return {Player} random player
   */
  getRandomPlayer() {
    const ids = Object.keys(Game.players);
    if (ids.length == 0) return false;

    const num = Math.floor(Math.random() * (ids.length - 1));
    const id = ids[num];
    return Game.players[id] || false;
  }
}

new Client();
