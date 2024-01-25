<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Bienvenue sur le<br> Module d'absences</h1>
    <div class="container w-96">
      <p class="text-lg">Pour configurer votre application afin d'avoir votre QR code, merci de cliquer sur le lien reçu
        par mail</p>
    </div>

    <button class="button-download m-auto" @click="installPWA">
      <span>Ajouter à l'écran d'accueil</span>
        <DownloadCmp color="white" size="20"/>
    </button>
  </div>
</template>
<style>
.button-download {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(13, 17, 23, 1);
  padding: 10px 20px;
  text-align: center;
  margin-top: 20px;
  border-radius: 10px;
  gap: 10px;
}
</style>
<script setup lang="ts">
import DownloadCmp from "@/components/utils/DownloadCmp.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
</script>
<script lang="ts">
import {Vue} from "vue-class-component";
export default class RegisterPage extends Vue{
  deferredPrompt = null;
  showInstallButton = false;

  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      // @ts-ignore
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
  }

  async installPWA() {
    if (this.deferredPrompt) {
      // @ts-ignore
      this.deferredPrompt.prompt();
      // @ts-ignore
      const { outcome } = await this.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log("L'utilisateur a accepté l'installation");
      } else {
        console.log("L'utilisateur a refusé l'installation");
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    }
  }
};
</script>