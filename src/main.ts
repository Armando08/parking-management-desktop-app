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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.token.accessToken) {
      next()
    } else {
      router.push({ name: 'login' })
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
