<template>
  <div id='app'>
    <OTP :inputColumn='5' userEmail='madhur@xyz.com'></OTP>
  </div>
</template>

<script>
import OTP from './components/OTP/otp.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    OTP
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
