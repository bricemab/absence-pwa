<template>
  <div>
    Key Register
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Utils from "@/utils/Utils";
import DeviceDetector from "device-detector-js";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
const key = computed(() => route.params.key);

onMounted(async () => {
  const deviceDetector = new DeviceDetector();
  const userAgent = navigator.userAgent;
  const device = deviceDetector.parse(userAgent);
  store.dispatch("register", {
    key: key.value,
    brand: device.device.brand || "",
    model: device.device.model || "",
    version: device.os.version || "",
    os: device.os.name || "",
  })
      .then((response: any) => {
        if (response.success === true) {
          // router.push({name: "root"});
        } else {
          alert('Les identifiants sont invalides');
        }
      })
      .catch((errorResponse: any) => {
        if (errorResponse) {
          if (errorResponse.success === false) {
            alert('Les identifiants sont invalides');
          }
        } else {
          alert("Le serveur ne répond pas. Veuillez contacter l'administrateur");
        }
      });
  // const response = await Utils.postEncodedToBackend("/users/register", {
  //   key: key.value,
  //   brand: device.device.brand || "",
  //   model: device.device.model || "",
  //   version: device.os.version || "",
  //   os: device.os.name || "",
  // });
  // if (!response.success) {
  //   return responseMessage.value = response.error!.message;
  // }
  // const data = response.data;
  // localStorage.setItem("token", data.token);
  // console.log(response)
})
</script>