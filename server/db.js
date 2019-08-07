// Dependencies
const mongoose = require('mongoose');

/** The MongoDB driver class
 * @property {mongoose} mongoose    - mongoose instance
 * @property {mongoose.connection}  - current connection
 * @property {mongoose.Schema}      - player schema
 * @property {mongoose.model}       - player model
 */
class Db {
  /** Create an instance and establish connection to a database */
  constructor() {
    this.mongoose = mongoose;
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
}

/**
 * @ignore
 * @return {Db} Instance of Db
 */
function getInstance() {
  if (instance === null) instance = new Db();
  return instance;
};

let instance = null;

module.exports = getInstance();

