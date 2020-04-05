<template>
  <div id="app">
    <UserInput></UserInput>
  </div>
</template>

<script>
import UserInput from "./components/otp/user-input.vue";
export default {
  name: "app",

  components: {
    UserInput
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
