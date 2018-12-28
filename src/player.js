import Bullet from './bullet'
import router from './router'

export default class Player {
  constructor (name, x, y, enermy = false) {
    this.name = name
    this.position = {}
    this.position.x = x
    this.position.y = y
    this.speed = 2
    this.direct = 0 //  0: up, 1: left，2: down，3: right
    this.attack = 1 // Attack!
    this.flood = 1  // HP
    this.sock = null // socket
    this.state = 0  // 0: Stop，1：Moving 
    this.bullets = []
    this.enermys = []

    this.speed_bullet = 5

    if (!enermy) {
      this.init()
    }
  }
  init () {
    this.sock = new WebSocket('ws://54.183.146.107:8082') // In dev can used localhost:xxxx
    this.sock.onopen = () => { this.onSockOpen() }
    this.sock.onmessage = (data) => { this.onSockMessage(data) }
    this.sock.onclose = () => { this.onSockClose() }
  }
  send (data) {
    if (this.sock) {
      this.sock.send(JSON.stringify(data))
    }
  }
  hurt (player) {
    player.flood--
    console.log(player.flood)

    if (player.flood === 0) {
      console.log("Enemy HP is 0.")
      this.send({ opt: 'kill', killer: this.name, killed: player.name })
      alert(this.name + " killed " + player.name)
      alert("You Win!!")
      // Restore to original HP
      player.flood = 1
      router.push({ path: 'menu' })
    } else {
      console.log("Update enemy hp")
      this.send({ opt: 'upblood', name: player.name, blood: player.flood })
    }
    
  }
  shoot () {
    // let bullet = new Bullet(this.enermys, this, this.direct, this.position.x, this.position.y, this.speed)
    let bullet = new Bullet(this.enermys, this, this.direct, this.position.x, this.position.y, this.speed_bullet)
    
    this.bullets.push(bullet)
    // console.log(this.bullets.length)
    this.send({ opt: 'shoot', name: this.name })
  }
  setName (username) {
    this.name = username
    // Send my location
    this.send({ opt: 'init', name: this.name, x: this.position.x, y: this.position.y })
  }
  setMessageBox (messagebox) {
    this.messagebox = messagebox
  }
  setRouter (router) {
    this.router = router
  }
  setEnermy (enermy) {
    this.enermy = enermy
  }
  onSockOpen () {
  }
  onSockMessage (e) {
    let data = JSON.parse(e.data)
    // console.log(data)

    switch (data.result) {
      case 'error':
        this.messagebox.add({ sender: 'System news', message: data.message })
        break
      case 'talk': // Chat info
        this.messagebox.add({ sender: data.sender, message: data.message })
        break
      case 'initok': // Initialize success!
        let playerList = data.playerList
        playerList.forEach((enermy, key, owner) => {
          if (enermy.name !== this.name) {
            console.log('New enemy name is: ' + enermy.name)
            let ee = new Player(enermy.name, enermy.position.x, enermy.position.y, true)
            console.log('Enemy set: ' + enermy.name + "  ee:" + ee.name)
            this.enermy.set(enermy.name, ee)
            this.enermys.push(ee)

            console.log("Length of Enemys array is :" + this.enermys.length)
          }
        })
        



        // router.push({ path: 'game' })
        
        
        
        
        break
      case 'kill': // player death
        let enermy3 = this.enermy.get(data.killed)
        this.messagebox.add({ sender: data.kill, message: 'kill' + data.killed })
        this.enermy.delete(data.killed)
        console.log('cnm')
        alert(data.kill + " killed " + data.killed)
        alert("You Lose. " + data.kill + "Win!")
        router.push({ path: 'menu' })
        // splice used for deleting the enemy object which is located at findIndex(enemy3)
        // Here is a BUG, which cannot retrive enemy3 from enemy. GOD DAMN FUCK
        // this.enermys.splice(this.enermys.findIndex(enermy3), 1)
        break
      case 'upposition': // update others info
        let enermy = this.enermy.get(data.name)
        enermy.direct = data.direct
        enermy.position.x = data.position.x
        enermy.position.y = data.position.y
        // console.log("Enermy direction:" + enermy.direct)
        break
      case 'upblood':
        let enermy1 = this.enermy.get(data.name)
        enermy1.flood = data.blood
        break
      case 'shoot': // player shoot
        let enermy2 = this.enermy.get(data.name)
        enermy2.shoot()
        break

    }
  }
  onSockClose () {
  }
  onframe () {
    if (this.state === 1) {
      this.move(this.direct)
      this.send({ opt: 'upposition', name: this.name, x: this.position.x, y: this.position.y, direct: this.direct })
    }
  }
  move (direct) {
    this.direct = direct
    switch (direct) {
      case 0:
        if (this.position.y > 0) {
          this.position.y -= this.speed
        }
        break
      case 1:
        if (this.position.x > 0) {
          this.position.x -= this.speed
        }
        break
      case 2:
        if (this.position.y < window.innerHeight - 55) {
          this.position.y += this.speed
        }
        break
      case 3:
        if (this.position.x < window.innerWidth - 55) {
          this.position.x += this.speed
        }
        break
    }
  }
}
