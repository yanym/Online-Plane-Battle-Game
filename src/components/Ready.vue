<template>
  <div class="container">
    <p>╭(●｀∀′●)╯</p>
    <div class = "user">
      <img src="../assets/dan.png"/>
    </div>
    <!-- <b> {{ username }} </b> -->
  </div>
</template>

<script>
export default {
  name: 'ready',
  computed: {
    username () {
      return this.$store.state.own.name
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: calc(100vh);
  text-align: center;
  vertical-align: middle;
}
.user{
  display: inline-block;
  border-radius: 4px;
  padding: 8px;
  border: solid 1px;
}
</style>
