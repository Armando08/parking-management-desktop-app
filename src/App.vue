<template>
  <v-app class="absolute inset-0">
    <div>
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
})
</script>
