<template>
  <div class="d-flex mt-5">
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
<style scoped lang="scss">
/*.home {*/
/*  display: flex;*/
/*}*/
</style>
