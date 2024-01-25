<template>
  <div class="register">
    <div class="overlay">
      <router-view/>
    </div>
  </div>
  <PortraitRequired/>
</template>
<script setup lang="ts">
import {useDark, useMouse, useToggle} from '@vueuse/core';
import DeviceDetector from "device-detector-js";
import {onMounted, Ref, ref} from "vue";
import PortraitRequired from "@/views/pages/no-layout/PortraitRequired.vue";

interface Test {
  a: string;
  b: string;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);
const {x, y} = useMouse()

const test = ref("asfasfa")
const zebi = ref<Test | null>(null);

onMounted(() => {
  // console.log(zebi.value)
  test.value = "111";
})
</script>
<style lang="scss">
* {
  min-width: 0;
  font: inherit;
}

*, *::before, *::after {
  box-sizing: border-box;
}

img, video, svg {
  display: block;
  height: auto;
  max-width: 100%;
}

body {
  background: white;
  margin: 0;
  min-height: 100dvh;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
</style>
