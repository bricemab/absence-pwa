<template>
  <div v-if="isLandscape" class="portrait-required">
    L'application n'est pas disponible en orientation paysage
  </div>
</template>
<style>
.portrait-required {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 17, 23, 1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1000; /* Assurez-vous qu'il est au-dessus de tout le reste */
}
</style>
<script setup lang="ts">
import {ref} from "vue";

const isLandscape = ref(window.orientation === 90 || window.orientation === -90);
window.addEventListener("orientationchange", () => {
  isLandscape.value = false;
  if (window.orientation === 90 || window.orientation === -90) {
    isLandscape.value = true;
  }
});

</script>