import Vue from 'vue'
import Vuex, { mapActions } from 'vuex'
import VuexPersistence from 'vuex-persist'
import Parking from '@/store/modules/parking'
import Reports from '@/store/modules/reports'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})
export default new Vuex.Store({
  modules: {
    Reports: Reports,
    Parking: Parking,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocal.plugin],
})