<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import DeviceDetector from "device-detector-js"

export default class App extends Vue {
  test = "";

  mounted() {
    const detector = new DeviceDetector();
    console.log(detector.parse(navigator.userAgent))
    this.test = "asdf";
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
