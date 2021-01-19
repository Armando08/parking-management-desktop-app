<template>
  <v-flex xs12 class="pr-3">
    <v-card style="position: absolute; top: 100px; width: 48%" width="100%">
      <v-toolbar color="dark" dark>
        <v-icon>mdi-information-outline</v-icon>
        <v-toolbar-title class="ml-2">Cash Desk </v-toolbar-title>
        <v-toolbar-title style="position:absolute; right: 15px;"
          ><v-icon class="pr-2">mdi-label </v-icon>Daily Amount: 1000
          ALL</v-toolbar-title
        >
      </v-toolbar>
      <v-list-item v-if="checkoutData.carPlate === undefined">
        Click a row to continue
      </v-list-item>
      <v-list v-else>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="black">mdi-car</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-subtitle>License Plate :</v-list-item-subtitle>
            <v-list-item-title>
              {{ checkoutData.carPlate }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="black">mdi-arrow-right-bold-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-subtitle>Date & Entry Time :</v-list-item-subtitle>
            <v-list-item-title>00:01:25</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="black">mdi-arrow-left-bold-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-subtitle>Date & Exit Time :</v-list-item-subtitle>
            <v-list-item-title>11:02:00</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="black">mdi-calendar-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>Total Time Spent :</v-list-item-subtitle>
            <v-list-item-title>
              11:02:00
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="black">mdi-cash-usd</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle>Totali :</v-list-item-subtitle>
            <v-list-item-title class="font-bold">200 ALL </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn
          large
          style="position: absolute; bottom: 15px; right: 10px;"
          color="success"
          @click="removeParkedCar"
          >Checkout
          <v-icon right>mdi-check</v-icon>
        </v-btn>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const Parking = namespace('Parking')
@Component({})
export default class ParkingBill extends Vue {
  @Parking.Getter
  checkoutData: any
  removeParkedCar() {
    console.log('removed')
  }
  created() {
    Object.keys(this.checkoutData).forEach(
      keys => delete this.checkoutData[keys]
    )
  }
}
</script>

<style scoped></style>
