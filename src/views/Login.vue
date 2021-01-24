<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout class="d-flex justify-center flex-row align-center">
          <v-flex xs10 sm8 md6 lg5 xl4>
            <v-card style="width: 100%" class="elevation-12">
              <v-toolbar :color="$colors.dark">
                <v-toolbar-title :style="`color: ${$colors.primaryWhite}`"
                  >Login</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="username"
                    :color="$colors.dark"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :color="$colors.dark"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    @keyup.13="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click.native="login"
                  block
                  :color="$colors.dark"
                  :style="`color: ${$colors.primaryWhite}`"
                >
                  <div class="login-logo-wrapper">
                    <v-icon class="login-logo">mdi-user</v-icon>
                  </div>
                  <div class="login-text">LOGIN</div>
                  <div class="btn-spacer"></div>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Login extends Vue {
  username?: string = ''
  password?: string = ''

  login() {
    const credentials: any = {
      loginTime: moment().format('DD/MM/YYYY HH:mm:ss'),
      email: this.username,
      password: this.password,
    }
    const isEmpty = () => {
      return (this.username === '' || this.password === '')
    }
    if (isEmpty()) {
      alert('How you can login without username or password ?')
      return this.$router.push({ name: 'Login' })
    }

    console.log(credentials, `credentials`)
    const response = this.$store.dispatch('login', credentials)
    if (!response) {
      return
    }
    if (this.username === 'admin') {
      return this.$router.push({ name: 'Reports' })
    }
    this.$router.push({ name: 'Home' })
  }
}
</script>
<style scoped lang="scss">
.login-header {
  color: white;
}
</style>
