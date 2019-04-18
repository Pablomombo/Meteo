<template>
  <div id="app" class="container">
    <!--<img alt="Vue logo" src="./assets/logo.png" class="logo">-->
    <Weather/>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    Weather,
  }
}
</script>

<style>
* {
box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
/*.logo {
  display: block;
  margin: 20px auto;
}*/
</style>
