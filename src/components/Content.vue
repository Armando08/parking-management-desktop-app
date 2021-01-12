<template>
  <v-container class="mt-2">
    <CarPlateInput />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CarPlateInput from '@/components/CarPlateInput.vue'
@Component({
  components: { CarPlateInput },
})
export default class Content extends Vue {

}
</script>
