let Player = require('./player')
let Director = require('./director')
let WebSocketServer = require('ws')
let uuid = require('uuid')

let wss = new WebSocketServer.Server({ port: 8082 })
let director = new Director()

wss.on('connection', function (ws) {
  console.log('Connection...')
  if (director.isFull || director.isStart) {
    ws.send(JSON.stringify({ opt: 'error', 'message': 'Start' }))
    return
  }
  let player = new Player(ws, uuid.v1())
  director.addPlayer(player)
})
