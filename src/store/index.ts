

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import modules from '@/store/modules';
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocal.plugin],
});
