<template>
    <div class="section" id="section_home" :style="note">
      <div class="bar">
        <a @click='back()'>Back</a>
        <a @click='exit_game()'>Exit game</a>
      </div>
      <div class="roomtitle">
        <h2>Room List</h2>
      </div>
      <div class="list">
        <div class="buttonbar">
          <a @click=refreshli>Refresh</a>
          <a @click=newroom>New room</a>
        </div>
        <ul class="roomlist" id="roomlist">
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    name: 'roomlist',
    data() {
        return {
            note:{
                backgroundImage: "url(" + require("../assets/welcome.gif") + ") ", backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover",
            }
        }
    },
    methods: {
        back: function() {
          this.$router.push({ path: 'main' })
        },
        exit_game: function() {
          this.$router.push({ path: '/' })
        },
        refreshli: function() {

        },
        newroom: function() {
          this.$router.push({ path: 'main' })
        }
    }
}
</script>

<style>
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

.buttonbar{
  padding-top: 1em;
  padding-bottom: 1em;
  color: white;
  text-align: right;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}

.buttonbar a{
  white-space: pre;
  background: rgba(255, 122, 0, 1);
  padding-left: 1.2em;
  padding-right: 1.2em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  margin-right: 2em;
  border-radius: 25%;
  font-weight: 800;
  font-size: 0.5em;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.buttonbar a:hover{
  cursor: pointer;
  background: rgba(120, 120, 120, 1);
}

.roomtitle{
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

.roomtitle h2{
  font-weight: 800;
  color: rgb(65, 63, 150);
}

.list{
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.roomlist{
  background-color: rgba(91, 91, 91, 0.5);
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 0;
}

.roomlist li{
  color: white;
  font-weight: bold;
  white-space: pre;
  list-style-type: none;
  border-bottom-style: solid;
  border-color: black;
  border-width: thin;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.roomlist .listtext{
  background-color: rgb(164, 2, 2);
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 20%;
  float: right;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.roomlist .listbutton{
  background-color: rgb(81, 241, 16);
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 20%;
  float: right;

  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
}

.roomlist .listbutton:hover{
  cursor: pointer;
  background-color: rgb(158, 109, 0);
}




</style>
