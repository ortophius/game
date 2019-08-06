/**
 * The MongoDB driver class
 * @constructor
 */
function Db() {
  this.mongoose = require('mongoose');
  this.connection = mongoose.connect('mongodb://localhost:27017/bebop', {useNewUrlParser: true});
  this.playerSchema = new mongoose.Schema({
    id: String,
    name: String,
    kills: Number,
    deaths: Number,
    plays: Number,
  });
  this.player = mongoose.model(this.playerSchema);
}

/**
 * Functions which returns a Db instance
 * @function getInstance
 * @return {Db}
 */
function getInstance() {
  if (instance === null) instance = new Db();
  return instance;
};

let instance = null;

module.exports = getInstance();

