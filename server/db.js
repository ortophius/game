let instance = null

function Db() {
    this.mongoose = require('mongoose')
    this.connection = mongoose.connect('mongodb://localhost:27017/bebop', {useNewUrlParser: true})
    this.playerSchema = new mongoose.Schema({
        id: String,
        name: String,
        kills: Number,
        deaths: Number,
        plays: Number
    })
    this.player = mongoose.model(this.playerSchema)
}

function getInstance(){
    if (instance === null) instance = new Db()
    return instance
}

module.exports = getInstance()
