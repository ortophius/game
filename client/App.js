const PIXI = require('pixi.js');

let appInstance = null;

module.exports = function() {
  if (appInstance === null) {
    appInstance = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  return appInstance;
}();
