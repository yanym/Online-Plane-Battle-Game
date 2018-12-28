class Player {
  constructor (ws, uid) {
    this.ws = ws
    this.uid = uid
    this.position = {}
    this.blood = 1
    this.speed = 1
    this.direct = 0
    this.state = 0
    this.ws.on('message', (message) => { this.onMessage(message) })
    this.ws.on('close', (close) => { this.onClose() })
  }
  setName (name) {
    this.name = name
  }
  setPosition (x, y) {
    this.position.x = x
    this.position.y = y
  }
  setDirector (director) {
    this.director = director
  }
  onMessage (message) {
    let data = JSON.parse(message)
    switch (data.opt) {
      case 'init':
        this.setName(data.name)
        this.setPosition(data.x, data.y)
        this.director.beReady()
        break
      case 'upposition':
        this.direct = data.direct
        this.position.x = data.x
        this.position.y = data.y
        this.director.updatePosition(this)
        break
      case 'talk':
        this.director.say(this, data.message)
        break
      case 'upblood':
        this.blood = data.blood
        this.director.updateBlood(this)
        break
      case 'shoot':
        this.director.shoot(this)
        break
      case 'kill':
        this.director.kill(this, data.killed)
        break
    }
  }
  onClose () {
    this.director.removePlayer(this)
  }
  send (data) {
    this.ws.send(JSON.stringify(data))
  }
  toJson () {
    return {
      name: this.name,
      blood: this.blood,
      speed: this.speed,
      direct: this.direct,
      state: this.state,
      uid: this.uid,
      position: this.position
    }
  }
}

module.exports = Player
