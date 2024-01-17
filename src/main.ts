import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const token = localStorage.getItem("token");
if (token) {
	store.dispatch("welcomeBack", token).then(() => {
		// router.push({ name: "root" });
	});
}

createApp(App).use(store).use(router).mount("#app");
