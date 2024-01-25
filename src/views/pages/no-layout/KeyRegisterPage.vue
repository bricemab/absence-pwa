<template>
  <div>
    <div class="container">
      <div class="m-4">
        <img v-if="status === RegisterStatus.REQUEST_PENDING" class="m-auto" src="@/assets/loader.svg" style="height: 100px"/>
        <BadFaceCmp v-else-if="status === RegisterStatus.REQUEST_ERROR" class="m-auto" color="white" size="100"></BadFaceCmp>
      </div>
      <p class="text-lg" v-html="message"></p>
    </div>
  </div>
</template>
<script setup lang="ts">
enum RegisterStatus {
  REQUEST_PENDING = "REQUEST_PENDING",
  REQUEST_ERROR = "REQUEST_ERROR"
}

import {computed, onMounted, ref} from "vue";
import Utils from "@/utils/Utils";
import DeviceDetector from "device-detector-js";
import {useRoute, useRouter} from "vue-router";
import {useStore } from "vuex";
import {ApplicationResponse} from "@/Types/GlobalType";
import {UserErrors} from "@/Types/BackendErrors";
import BadFaceCmp from "@/components/utils/BadFaceCmp.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const key = computed(() => route.params.key);
const isLoading = ref(true);
const message = ref("Récupération des données en cours...");
const status = ref(RegisterStatus.REQUEST_PENDING)

onMounted(async () => {
  const deviceDetector = new DeviceDetector();
  const userAgent = navigator.userAgent;
  const device = deviceDetector.parse(userAgent);
  await Utils.awaitTimeout(1500);
  message.value = "Configuration de votre compte en cours...";
  store.dispatch("register", {
    key: key.value,
    brand: device.device.brand || "",
    model: device.device.model || "",
    version: device.os.version || "",
    os: device.os.name || "",
  })
      .then((response: any) => {
        if (response.success === true) {
          router.push({name: "index"});
        } else {
          alert('Les identifiants sont invalides');
        }
        isLoading.value = false;
      })
      .catch(async (errorResponse: ApplicationResponse<any>) => {
        status.value = RegisterStatus.REQUEST_ERROR;
        if (errorResponse.success && !errorResponse.error) {
          return message.value = "Le serveur ne répond pas. Veuillez contacter l'administrateur";
        }
        switch (errorResponse.error!.code) {
          case UserErrors.KEY_NO_MATCH:
            message.value = "La clé semble invalide. Veuillez cliquer sur le lien reçu par mail";
            message.value = "Une erreur est survenue lors de la configuration de votre compte. Veuillez contacter votre administrateur";
            break;
          default:
            message.value = "Une erreur est survenue lors de la configuration de votre compte. Veuillez contacter votre administrateur"
            break;
        }
        message.value += "<br>Veuillez lui transmettre le code '"+errorResponse.error!.code+"'";
      });
})
</script>