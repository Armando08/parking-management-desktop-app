<template>
  <v-flex class="d-flex mt-16">
    <v-container class="d-flex justify-center flex-column ml-3">
      <car-plate-input />
      <parking-list />
    </v-container>
    <v-container>
      <parking-bill />
    </v-container>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CarPlateInput from '@/components/CarPlateInput.vue'
import ParkingList from '@/components/ParkingList.vue'
import ParkingBill from '@/components/ParkingBill.vue'
@Component({
  components: { ParkingBill, ParkingList, CarPlateInput },
})
export default class Content extends Vue {}
</script>
