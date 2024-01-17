<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  {{test}}AA-->
<!--  <button @click="toggleDark()">-->
<!--    Is Dark: {{ isDark }}-->
<!--  </button>-->
    <router-view />
</template>
<script setup lang="ts">
import { Vue } from "vue-class-component";
import {useDark, useMouse, useToggle} from '@vueuse/core';
import DeviceDetector from "device-detector-js";
import {onMounted, Ref, ref} from "vue";

interface Test {
  a: string;
  b: string;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { x, y } = useMouse()

const test = ref("asfasfa")
const zebi = ref<Test | null>(null);


onMounted(() => {
  // console.log(zebi.value)
  test.value = "111";
})
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
