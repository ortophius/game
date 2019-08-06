const Cookies = require('js-cookie')

let instance  = null

function getInstance(){
    if (instance == null) instance = new Network()
    return instance
}

function Network(){
    let io = require('socket.io-client')
    this.io = io()
    this.id = null
    this.checkId(Cookies.get('id'))
}

Network.prototype.setId = function(id){
    this.id = id
    Cookies.set('id', id)
}

Network.prototype.checkId = async function(id){
    let _ = this
    console.log("id is: "+id)
    if (typeof(id) !== "string") this.setId(await this.queryId())
    else {
        this.io.once('checkIdReply', verifyId)
        this.io.emit('checkId', id)
    }

    function verifyId(state){
        if (state) _.setId(id)
    }
}

Network.prototype.queryId = function(){
    let _ = this
    console.log("querying id")
    return new Promise(function(resolve, reject){
        _.io.once('getNewIdReply', function(id){ _.checkId(id) })
        _.io.emit('getNewId')
    })
}

module.exports = getInstance()