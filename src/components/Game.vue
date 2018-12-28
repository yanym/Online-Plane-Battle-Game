<template>
  <div class = "scene">
    <!-- Avoid key duplicate, place 1, 'A' -->
    <div class="monster" 
         v-for="(monster, index) of monsters" :key="'A' + index"
         :style="{ left:monster.position.x + 'px',top:monster.position.y + 'px' }">
      <!-- plane1.png is enemies -->
      <img src="../assets/plane1.png"
           :class="{ 'turn-left':monster.direct == 1,'turn-right':monster.direct == 3,'turn-up':monster.direct == 0,'turn-down':monster.direct == 2 }"/>
      <p>{{ monster.name }}</p>
    </div>
    <!-- Avoid key duplicate, place 1, 'H' -->
    <span v-for="(monster, index) of monsters" :key="'H' + index">
      <!-- Avoid key duplicate, place 1, 'O' -->
      <div class="bullet" v-for="(bullet,index2) of monster.bullets"
           :key="'O' + index2"
           :style="{left:bullet.position.x + 'px',top:bullet.position.y + 'px'}">
      </div>
    </span>

    <div class="monster" :style="{ left:own.position.x + 'px',top:own.position.y + 'px' }">
      <!-- plane2.png is my perspective -->
      <img src="../assets/plane2.png"
           :class="{ 'turn-left':own.direct == 1,'turn-right':own.direct == 3,'turn-up':own.direct == 0,'turn-down':own.direct == 2 }"/>
      <p>{{ own.name }}</p>
    </div>
    <!-- Avoid key duplicate, place 1, 'T' -->
    <div class="bullet" v-for="(bullet, index) of own.bullets" :key="'T' + index"
         :style="{ left:bullet.position.x + 'px',top:bullet.position.y + 'px' }">
    </div>

    <div class="play-control">
      <div>
        <!-- @keyup.up="turn(0)" -->
        <!-- If you need touch response for these buttons -->
        <!-- touchstart and touchend -->
        <!-- If you need click response  -->
        <!-- click and clickend -->

        <!-- <div @touch="turn(2)" @touchend="turnEnd()" class="down"></div> -->

        <div @click="turn(0)" class="up"></div>
      </div>
      <div style="text-align: initial;">
        <div @click="turn(1)" class="left"></div>
        <div @click="turn(3)" class="right"></div>
        <!-- Affect the bottom button position -->
        <!-- <div class="clear"></div> -->
      </div>
      <div>
        <div @click="turn(2)" class="down"></div>
      </div>
    </div>
    <div class="shoot-control" @click="shoot()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  computed: {
    monsters () {
      return this.$store.state.own.enermys
    },
    own () {
      return this.$store.state.own
    }
  },
  mounted: function () {
    let that = this
    function _callback () {
      for (let monster of that.$store.state.own.enermys) {
        monster.onframe()
        for (let bullet of monster.bullets) {
          bullet.onframe()
        }
      }
      that.$store.state.own.onframe()
      for (let bullet of that.$store.state.own.bullets) {
        bullet.onframe()
      }
      requestAnimationFrame(_callback)
    }
    _callback()
  },
  methods: {
    turn (direct) {
      this.$store.dispatch('move', direct)
    },
    turnEnd () {
      this.$store.dispatch('turnEnd')
    },
    shoot () {
      this.$store.dispatch('shoot')
    }
  }
}
</script>

<style scoped>
.scene{
  position: relative;
  overflow: hidden;
  width:100%;
  height:calc(100vh);
}
@keyframes bombframe{
  0% {background: url(../assets/plane1.png)}
  20% {background: url(../assets/bomb/explosion1.png)}
  40% {background: url(../assets/bomb/explosion2.png)}
  60% {background: url(../assets/bomb/explosion3.png)}
  80% {background: url(../assets/bomb/explosion4.png)}
  100% {background: url(../assets/bomb/explosion5.png)}
}
@-webkit-keyframes bombframe{
  0% {background: url(../assets/plane2.png)}
  20% {background: url(../assets/bomb/explosion1.png)}
  40% {background: url(../assets/bomb/explosion2.png)}
  60% {background: url(../assets/bomb/explosion3.png)}
  80% {background: url(../assets/bomb/explosion4.png)}
  100% {background: url(../assets/bomb/explosion5.png)}
}
.bomb{
  animation:bombframe 2s;
  -webkit-animation: bombframe 2s;
}
.turn-right{
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -o-transform:rotate(270deg) ;
  transform: rotate(270deg);
}
.turn-left{
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
.turn-up{
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.turn-down{
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
.monster{
  position: absolute;
  display: inline-block;
  text-align: center;
}
.bullet{
  position: absolute;
  display: inline-block;
  width: 5px;
  height: 5px;
  background: #000;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.play-control{
  position: fixed;
  text-align:center;
  bottom:0;
  left:0;
  background: rgb(255, 255, 255);
  width:100px;
  height:100px;
  opacity: 0.9;
  z-index: 999;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 200px;
}
.clear{
  clear: both;
}
.play-control .left{
  display: inline-block;
  width:0;
  height:0;
  float: left;
  border-top: 25px solid transparent;
  border-right: 25px solid rgb(2, 255, 78);
  border-bottom: 25px solid transparent;
  vertical-align: middle;
}
.play-control .right{
  display: inline-block;
  width:0;
  height:0;
  float: right;
  vertical-align: middle;
  border-top: 25px solid transparent;
  border-left: 25px solid rgb(255, 16, 16);
  border-bottom: 25px solid transparent;
}
.play-control .up{
  display: inline-block;
  vertical-align: top;
  width:0;
  height:0;
  border-right: 25px solid transparent;
  border-bottom: 25px solid rgb(107, 83, 214);
  border-left: 25px solid transparent;
}
.play-control .down{
  display: inline-block;
  vertical-align: bottom;
  width:0;
  height:0;
  border-right: 25px solid transparent;
  border-top: 25px solid rgb(0, 103, 172);
  border-left: 25px solid transparent;
}
.play-control .left:active{
  border-right: 25px solid #A88888;
}
.play-control .right:active{
  border-left: 25px solid #A88888;
}
.play-control .up:active{
  border-bottom: 25px solid #A88888;
}
.play-control .down:active{
  border-top: 25px solid #A88888;
}
.shoot-control{
  position: fixed;
  text-align:center;
  bottom:0;
  right:0;
  background: #E9E9E9;
  width:100px;
  height:100px;
  opacity: 0.9;
  z-index: 999;
  -webkit-border-radius: 200px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  background-size: 100%;
  background: url(../assets/FPS.png) no-repeat;
}
</style>
