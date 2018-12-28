class Director {
  constructor (server) {
    this.server = server
    this.players = new Set()
    this.isStart = false
    this.ready = 0
    this.isFull = false
  }
  addPlayer (player) {
    this.players.add(player)
    player.setDirector(this)
    if (this.players.size === 2) {
      this.isFull = true
    }
  }
  beReady () {
    this.ready++
    if (this.ready === 2) {
      this.start()
    }
  }
  removePlayer (player) {
    this.players.delete(player)
    player.director = null
  }
  start () {
    this.isStart = true
    let playerList = []
    this.players.forEach(function (player, key, ownerSet) {
      playerList.push(player.toJson())
    })
    this.players.forEach(function (player, key, ownerSet) {
      player.send({ result: 'initok', playerList: playerList })
    })
  }
  endGame () {
    this.players.clear()
    this.isStart = false
    this.isFull = false
    this.ready = 0
  }
  updatePosition (target) {
    this.players.forEach(function (player, key, ownerSet) {
      if (player !== target) {
        player.send({ result: 'upposition', name: target.name, direct: target.direct, position: target.position })
      }
    })
  }
  updateBlood (target) {
    this.players.forEach(function (player, key, ownerSet) {
      if (player !== target) {
        player.send({ result: 'upblood', name: target.name, blood: target.blood })
      }
    })
  }
  shoot (target) {
    this.players.forEach(function (player, key, ownerSet) {
      if (player !== target) {
        player.send({ result: 'shoot', name: target.name })
      }
    })
  }
  kill (target, killed) {
    this.players.forEach(function (player, key, ownerSet) {
      if (player !== target) {
        player.send({ result: 'kill', kill: target.name, killed: killed })
      }
    })
  }
  say (target, message) {
    this.players.forEach(function (player, key, ownerSet) {
      player.send({ result: 'talk', sender: target.name, message: message })
    })
  }
}

module.exports = Director
