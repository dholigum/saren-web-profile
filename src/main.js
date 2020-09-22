import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueFirestore from 'vue-firestore';
import VuetifyConfirm from 'vuetify-confirm';

Vue.use(VuetifyConfirm, { vuetify })

Vue.use(VueFirestore)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
