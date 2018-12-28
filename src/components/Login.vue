<template>
  <!-- <div class = "container">
    <div class = "input-row">
      <label>Nintendo Plane</label>
      <input type="text" v-model="username"/>
    </div>
    <button class = "btn btn-info" @click="login()">Login</button>
  </div> -->
  <div class="section" id="section_home" :style="note">
    <div class="title">
    <h2>Player Name!!!!</h2>
    <button class = "btn btn-xs" @click="miruku()"> Do not click here</button>
    </div>
    <div class="container">
    <input type="text" v-model="username"/>
    </div>
    <div class="container" id="buttoncontainer">
    <button class='button' @click="login()">Enter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return { 
      username: '',
      note:{
        backgroundImage: "url(" + require("../assets/welcome.gif") + ") ", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
      }
    }
  },
  methods: {
    miruku() {
      this.$router.push({ path: 'ready' })
    },
    login () {
      if(this.username === ""){
        alert('Please enter a player name!');
        return;
      }
      if(this.username.length > 4){
        alert('Player name should be no longer than 3!');
        return;
      }
      if(!(/^[a-zA-Z0-9_]+$/.test(this.username))){
        alert('Player name contains illegal characters!');
        return;
      }
      // console.log(this.$router)
      this.$store.dispatch('login', this.username)
      // this.$router.push({ path: 'ready' })
      this.$router.push({ path: 'menu' })
    }
  }
}
</script>

<style>
/* .container{
  width: 100%;
  height: calc(100vh);
  text-align: center;
  vertical-align: middle;
}
.input-row{
  width:50%;
  height: 64px;
  line-height: 64px;
  display: inline-block;
  margin:4px 0;
}
.input-row label{
  font-size:2.4rem;
  width:30%;
  display: inline-block;
}
.input-row input{
  width: 68.8%;
  height:64px;
} */
.section{
  width: 100%;
  height: calc(100vh);
  text-align: center;
  vertical-align: middle;
}

.title h2{
  font-weight: 800;
  color: rgb(65, 63, 150);
}

.container{
  /* padding: 1em; */
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.container input{
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5%;
  font-weight: 800;
  width:10em;
}

#buttoncontainer{
  padding-top: 4em;
  color: white;
}

.button{
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  background: rgba(235, 179, 242, 1);
  border-radius: 50%;
  font-weight: 800;
  font-size: 1.5em;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.button:hover{
  cursor: pointer;
  background: rgba(237, 96, 51, 1);
}
</style>
