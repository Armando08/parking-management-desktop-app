<template>
  <div class="reports-wrapper">
    <v-form>
      <v-container class="filter-container">
        <v-layout row wrap>
          <v-menu
            v-model="entryCalendar"
            :close-on-content-click="false"
            full-width
            max-width="290"
            class="pl-5"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateFormatEntry"
                clearable
                label="Start Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fromDate"
              @change="entryCalendar = false"
            ></v-date-picker>
          </v-menu>

          <v-menu
            v-model="exitCalendar"
            :close-on-content-click="false"
            full-width
            max-width="290"
            class="pr-5"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="dateFormatExit"
                clearable
                label="End Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="toDate"
              @change="exitCalendar = false"
            ></v-date-picker>
          </v-menu>

          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="userFilter"
              label="user"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-btn large color="black" @click="filterReports">
              <v-icon right color="white">mdi-magnify</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <div class="table-container">
      <v-card class="table-content" style="margin-top:0px">
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
          :headers="headers"
          :items="getReportsData"
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
                  pagination.descending ? 'desc' : 'asc',
                  header.value === pagination.sortBy ? 'active' : '',
                ]"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr :active="props.selected">
              <td class="text-uppercase">{{ props.item.user }}</td>
              <td class="text-uppercase">
                {{ props.item.carPlate }}
              </td>
              <td>{{ props.item.timeAmount }}</td>
              <td>{{ props.item.totalClientAmount }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div class="total-filtered">
      <v-chip class="ma-2" color="pink" label large text-color="white">
        <v-icon left>
          mdi-car
        </v-icon>
        Total Parked Cars : {{ this.getTotalFilteredCars }}
      </v-chip>
      <v-chip class="ma-2" color="cyan" label large text-color="white">
        <v-icon left>
          mdi-cash-usd
        </v-icon>
        Total Amount : {{ this.getTotalFiltered }}
      </v-chip>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment/moment'
import { namespace } from 'vuex-class'
const ReportsStore = namespace('Reports')
const Parking = namespace('Parking')
@Component({})
export default class Reports extends Vue {
  @Parking.Getter
  getUser: any
  @ReportsStore.Getter
  getReportsData: any
  @ReportsStore.Getter
  getTotalFiltered: number
  @ReportsStore.Getter
  getTotalFilteredCars: number
  fromDate?: string = moment().format('YYYY-MM-DD')
  toDate?: string = moment().format('YYYY-MM-DD')
  entryCalendar?: boolean = false
  exitCalendar?: boolean = false
  userFilter?: string = ''
  currentTime?: string = ''
  currentDate?: string = ''
  search?: string = ''
  pagination: object = {
    sortBy: 'entry',
    rowsPerPage: -1,
  }
  headers: Array<object> = [
    {
      text: 'User',
      value: 'user',
      align: 'center',
      class: 'text-center',
    },
    {
      text: 'Car Plate',
      value: 'carPlate',
      align: 'center',
      class: 'text-center',
    },
    {
      text: 'Total Time',
      value: 'timeAmount',
      align: 'center',
      class: 'text-center',
    },
    {
      text: 'Amount',
      value: 'totalClientAmount',
      align: 'center',
      class: 'text-center',
    },
  ]

  get getDate() {
    return {
      currentDate: moment()
        .locale('sq')
        .format('LLLL')
        .slice(0, 18),
    }
  }
  get dateFormatEntry() {
    return this.fromDate ? moment(this.fromDate).format('DD/MM/YYYY') : ''
  }
  get dateFormatExit() {
    return this.toDate ? moment(this.toDate).format('DD/MM/YYYY') : ''
  }

  timeInterval() {
    setInterval(() => {
      this.currentTime = moment().format('H:mm:ss a')
    }, 1000)
  }
  filterReports() {
    alert('filtering')
    const data: object = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      user: this.userFilter,
    }
    this.$store.dispatch('filterReportData', data)
  }

  created() {
    this.timeInterval()
  }
  mounted() {
    console.log(this.getUser, `get user`)
    if (!this.getUser) {
      console.log(this.getTotalFilteredCars)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style scoped>
.reports-wrapper {
  position: relative;
  top: 100px;
}
  .total-filtered{
    display: flex;
    justify-content: center;
    position: relative;
    top: 50px;
  }
</style>
