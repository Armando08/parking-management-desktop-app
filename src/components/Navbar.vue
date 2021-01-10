<template>
    <v-app-bar :color="$colors.dark" app fixed>
      <v-toolbar-title style="color: white">Parking Management</v-toolbar-title>
      <v-divider color="white" class="mx-3" inset vertical></v-divider>
      <v-toolbar-title style="color: white">{{
        getDate.currentDate
      }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-title style="color: white">{{ currentTime }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn fab :color="$colors.white">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class NavBar extends Vue {
  currentTime?: string = ''
  currentDate?: string = ''

  getDate() {
    return {
      currentDate: moment()
        .locale('en')
        .format('LLLL')
        .slice(0, 18),
    }
  }

  timeInterval() {
    setInterval(() => {
      this.currentTime = moment().format('H:mm:ss a')
    }, 1000)
  }

  created() {
    this.timeInterval()
  }
}
</script>
