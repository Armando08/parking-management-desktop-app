import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { theme, colors } from '@/../src/theme.ts'

Vue.mixin({
  computed: {
    $colors() {
      return colors
    },
    $theme() {
      return theme
    },
  },
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  template: '<App/>',
  render: h => h(App),
}).$mount('#app')
