<template>
  <v-app class="absolute inset-0 bg-gradient-to-r from-cyan-400">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
})
</script>
