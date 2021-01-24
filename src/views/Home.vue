<template>
  <div class="d-flex mt-5">
    <Content />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Content from '@/components/Content.vue'

@Component({
  components: {
    Content
  },
})
export default class Home extends Vue {}
</script>
<style scoped lang="scss">
/*.home {*/
/*  display: flex;*/
/*}*/
</style>
