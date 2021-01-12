<template>
  <v-app-bar :color="$colors.dark" app fixed>
    <v-toolbar-title style="color: white">Parking Management</v-toolbar-title>
    <v-divider color="white" class="mx-3" inset vertical></v-divider>
    <v-toolbar-title style="color: white">{{
      Date.currentDate
    }}</v-toolbar-title>
    <v-toolbar-title
      class="current-time"
      :class="displayLogoutBtn ? 'current-time' : ''"
      >{{ currentTime }}</v-toolbar-title
    >
    <v-spacer v-if="displayLogoutBtn"></v-spacer>
    <v-btn v-if="displayLogoutBtn" @click.prevent="logout" fab :color="$colors.white">
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
  displayLogoutBtn?: boolean = false

  get Date() {
    return {
      currentDate: moment()
        .locale('en')
        .format('LLLL')
        .slice(0, 18),
    }
  }
  logout() {
    this.$router.push({ name: 'Login' })
  }

  timeInterval() {
    setInterval(() => {
      this.currentTime = moment().format('H:mm:ss a')
    }, 1000)
  }

  created() {
    this.timeInterval()
    this.displayLogoutBtn = window.location.pathname !== '/login'
  }
}
</script>
<style scoped lang="scss">
.current-time {
  color: white;
  font-weight: 700;
  font-size: xx-large;
}
</style>
