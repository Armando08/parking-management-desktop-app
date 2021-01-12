<template>
  <v-flex d-flex class="pr-3">
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 6 : 2}`"
        class="mr-auto car-plate-content"
      >
        <v-flex xs12 sm8 class="input-content">
          <v-text-field
            label="Targa"
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
    </v-hover>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
@Component({})
export default class CarPlateInput extends Vue {
  plate = ''
  id = 0

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
      id: ++this.id,
      fromDate: moment().format('YYYY-MM-DD'),
    }
    this.plate = ''
  }
}
</script>

<style lang="scss" scoped>
.car-plate-content {
  width: 50%;
  height: 200px;
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
