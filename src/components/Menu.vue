<template>
    <div class="section" id="section_home" :style="note">
        <div class="bar">
        <a @click="exit()">Exit game</a>
        </div>
        <div class="maintitle">
        <!-- <h2>Welcome, {{ this.$store.state.own }}!</h2> -->
        <h2>Welcome, {{ this.$store.state.own.name }}!</h2>
        </div>
        <div class="container" id="buttoncontainer">
        <button class="mainbutton" @click="newroom()">New room</button>
        <button class="mainbutton" @click="joinroom()">Join room</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu_component',
    data() {
        return {
        note:{
            backgroundImage: "url(" + require("../assets/welcome.gif") + ") ", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
        }
        }
    },
    methods: {
        exit: function() {
            this.$router.push({ path: '/' })
        },
        newroom: function() {
            this.$router.push({ path: '/game' })
        },
        joinroom: function() {
            this.$router.push({ path: '/roomlist' })
        }
    }
}
</script>

<style>
/* .section{
  padding: 2.5em 10%;
  padding-left: 0;
  padding-right: 0; 
  width:100%; 
  height: 100%;
  MARGIN: 0px auto; 
} */
.section{
  width: 100%;
  height: calc(100vh);
  text-align: center;
  vertical-align: middle;
}

.bar{
  color: white;
  text-align: right;
}

.bar a{
  background: rgba(120, 120, 120, 0.5);
  padding-left: 1.2em;
  padding-right: 1.2em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  margin-right: 2em;
  border-radius: 25%;
  font-weight: 800;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.bar a:hover{
  cursor: pointer;
  background: rgba(120, 120, 120, 1);
}

.maintitle{
  padding-top: 6em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.maintitle h2{
  font-weight: 800;
  color: rgb(65, 63, 150);
}

.mainbutton{
  padding: 0.4em;
  margin-left: 1em;
  margin-right: 1em;
  background: rgba(235, 179, 242, 0.5);
  font-weight: 800;
  font-size: 1.5em;
  border-radius: 25%;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.mainbutton:hover{
  cursor: pointer;
  background: rgba(237, 96, 51, 0.5);
}
</style>
