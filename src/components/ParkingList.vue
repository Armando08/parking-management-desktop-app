<template>
  <v-card class="parking-list-container ml-3 mr-5">
    <v-card-title>
      Parked Cars
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="parkingList"
      :search="search"
      :show-select="true"
      :items-per-page="10"
      item-key="currentTime"
      class="w-full elevation-1"
    >
      <template v-slot:item="row">
        <tr
          :active="row.selected"
          :key="row.index"
          @click="checkoutDetails(row.index)"
        >
          <td class="text-uppercase text-center">{{ row.item.plate }}</td>
          <td class="text-center">
            {{ row.item.currentTime }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const Parking = namespace('Parking')
@Component({})
export default class ParkingList extends Vue {
  @Parking.Getter
  parkingList!: object[]
  search?: string = ''
  options: object | any = {
    sortBy: 'entry',
    rowsPerPage: -1,
  }
  selected: any = []
  headers: Array<Record<string, any>> = [
    {
      text: 'Car Plate',
      value: 'plate',
      align: 'center',
      class: 'text-center',
    },
    {
      text: 'Entry Time',
      value: 'currentTime',
      align: 'center',
      sortable: true,
    },
  ]
  checkoutDetails = (index: number) => {
    this.$store.dispatch('setCheckoutDetail', index)
  }
}
</script>
<style lang="scss">
.parking-list-container {
  width: 47%;
  overflow: auto;
  position: absolute;
  top: 250px;
  margin-left: 0 !important;
  th.text-start {
    display: none !important;
  }
}
</style>
