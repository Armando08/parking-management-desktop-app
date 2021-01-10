<template>
  <v-app class="absolute inset-0 bg-gradient-to-r from-cyan-400">
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '../src/views/Home.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
})
</script>
