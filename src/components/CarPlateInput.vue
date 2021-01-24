<template>
  <v-card class="mr-3 ml-5 car-plate-content">
    <v-flex xs12 sm8 md-4 class="input-content">
      <v-text-field
        label="License Plate"
        single-line
        prepend-inner-icon="mdi-car"
        v-model="plate"
        @keyup.13="addPlate"
      ></v-text-field>
      <v-btn
        fab
        medium
        :color="$colors.dark"
        @click="addPlate"
        class="add-button"
      >
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
    </v-flex>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
@Component({})
export default class CarPlateInput extends Vue {
  plate?:string = ''
  id?: number = 0

  addPlate() {
    const currentTime: string = moment().format('DD/MM/YYYY HH:mm:ss')
    const startTimestamp: number = new Date().getTime()
    const parkedDetails: object = {
      plate: this.plate
        .toUpperCase()
        .split(' ')
        .join(''),
      currentTime,
      startTimestamp,
      id: this.id++,
      fromDate: moment().format('YYYY-MM-DD'),
    }
    this.$store.dispatch('printEntryInvoice', parkedDetails)
    this.plate = ''
  }
}
</script>

<style lang="scss" scoped>
.car-plate-content {
  /*width: 50%;*/
  height: 100px;
  margin-left: 0 !important;
  .input-content {
    position: relative;
    margin: auto;
    top: 30%;
    display: flex;
    padding-left: 5px;
    padding-right: 5px;
    .add-button {
      position: relative;
      left: 30px;
    }
  }
}
</style>
