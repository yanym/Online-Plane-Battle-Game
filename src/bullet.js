export default class Bullet {
  constructor (players, player, direct, x, y, speed) {
    this.players = players
    this.player = player
    this.direct = direct
    this.speed = speed
    this.isdie = false
    this.position = {}
    this.position.x = x + 28
    this.position.y = y + 28
  }
  move () {
    switch (this.direct) {
      case 0:
        this.position.y -= this.speed
        break
      case 1:
        this.position.x -= this.speed
        break
      case 2:
        this.position.y += this.speed
        break
      case 3:
        this.position.x += this.speed
        break
    }
    // Bullet out of bound?
    if (this.position.x <= 0 || this.position.x >= window.innerWidth || this.position.y <= 0 || this.position.y >= window.innerHeight) {
      this.isdie = true
      this.player.bullets.splice(this.player.bullets.findIndex(n => n === this), 1)
    }
    // Bullet shot someone?
    // console.log("当前我的位置"+ "x: " + this.position.x + " y: " + this.position.y )
    for (let player of this.players) {
      // console.log('Judging')
      console.log("x: " + player.position.x + " y: " + player.position.y )
      if (player === this.player) {
        continue
      }
      if (this.position.x <= player.position.x + 28 && this.position.x >= player.position.x - 28 && this.position.y <= player.position.y + 28 && this.position.y >= player.position.y - 28) {
        console.log('GOALLLLLLLLLLLLLL!!!!!!!!!!!!!!!!!!!!!!!!!')
        this.isdie = true
        this.player.hurt(player)
        this.player.bullets.splice(this.player.bullets.findIndex(n => n === this), 1)
      }
    }
  }
  onframe () {
    if (!this.isdie) {
      this.move()
    }
  }
}
