<template>
  <v-app class="absolute inset-0">
   <navbar />
      <router-view />
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Navbar from '@/components/Navbar.vue'
  @Component({
    components: { Navbar },
  })
  export default class App extends Vue {

  }
</script>
