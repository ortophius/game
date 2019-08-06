
function Server(socket){
    this.socket = socket
    this.id = null
    this.db = null // Ill do that later
    this.registerEvents()
    this.socket.on('getNewId', function(){ console.log('test') })
}

Server.prototype.checkId = async function(id){
    let _ = this
    
    // let check = await _.db.checkId(id)
    let check = true
    if(typeof(check) !== 'boolean') check = false
    
    _.socket.emit("checkIdReply", check)
}

Server.prototype.setNewId = function(){
    let id = this.createId()
    this.id = id
    console.log("Creating player "+id)
    // this.db.createPlayer(id)
    this.socket.emit('getNewIdReply', id)
}

Server.prototype.createId = function(){
    let id = '';
    let random_ascii;
    let string_length = 16
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        id += String.fromCharCode(random_ascii)
    }
    return id
}

Server.prototype.registerEvents = function(){
    let _ = this
    this.socket.on('getNewId', _.setNewId.bind(_))
    this.socket.on('checkId', _.checkId.bind(_))
}

module.exports = Server