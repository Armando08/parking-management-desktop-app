<template>
  <v-card class="parking-list-container ml-3 mr-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="carDetails"
      :search="search"
      item-key="currentTime"
      class="w-full"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="[
              'column sortable text-center',
              options.descending ? 'desc' : 'asc',
              header.value === options.sortBy ? 'active' : '',
            ]"
            @click="changeSort(header.value)"
          >
            <v-icon small>mdi-arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected" @click="checkout(props.index)">
          <td class="text-uppercase text-center">{{ props.item.plate }}</td>
          <td class="text-center">
            {{ props.item.currentTime.slice(11, 19) }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  computed: {
    ...mapGetters({
      carDetails: 'getCarsInStore',
    }),
  },
})
export default class ParkingList extends Vue {
  search?: string = ''
  options: object | any = {
    sortBy: 'entry',
    rowsPerPage: -1,
  }
  parkedCars?: Array<any> = []
  selected: [] = []
  headers: Array<Record<string, any>> = [
    {
      text: 'Car Plate',
      value: 'plate',
      align: 'right',
      class: 'text-center',
    },
    {
      text: 'Entry Time',
      value: 'currentTime',
      align: 'left',
      sortable: true,
    },
  ]

  changeSort(column: string) {
    if (this.options.sortBy === column) {
      this.options.descending = !this.options.descending
    } else {
      this.options.sortBy = column
      this.options.descending = false
    }
  }
  mounted() {
    console.log(this.$vuetify.breakpoint.width)
  }
}
</script>
<style scoped lang="scss">
.parking-list-container {
  /*width: 50%;*/
  overflow: auto;
}
</style>
