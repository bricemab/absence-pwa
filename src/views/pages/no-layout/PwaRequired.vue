<template>
  <div v-if="isLandscape" class="portrait-required">
    Veuillez ajouter l'application a l'écran d'accueil pour continuer à l'utiliser
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
  z-index: 1000;
}
</style>
<script setup lang="ts">


</script>