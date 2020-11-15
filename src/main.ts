import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store, { MutationTypes } from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit(MutationTypes.INIT_STORE);
  }
}).$mount("#app");

store.subscribe((mutation: any, state: any) => {
  localStorage.setItem("store", JSON.stringify(state));
});
