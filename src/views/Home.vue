<template>
  <div class="home">
    <NavBar />
    <Content />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '@/components/Navbar.vue'
import Content from '@/components/Content.vue'

@Component({
  components: {
    Content,
    NavBar,
  },
})
export default class Home extends Vue {}
</script>
