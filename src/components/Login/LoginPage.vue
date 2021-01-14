<template>
  <div class="content">
    <div v-if="!auth.loggedIn">
      <h3>Zaloguj się</h3>
      <form method="post">
        <div class="txt_field">
          <label for="usernameInput">Nazwa użytkownika: </label><br>
          <input class="w3" id="usernameInput" type="text" v-model="username"><br>
        </div>
        <div class="txt_field">
          <label for="passwordInput">Hasło: </label><br>
          <input type="password" v-model="password" id="passwordInput"><br>
        </div>
      </form>
      <button class="submit-btn" @click="onClick">
        Login
      </button>
    </div>
    <div v-if="auth.loggedIn">
      <h3>Zalogowano</h3>
    </div>
  </div>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: "Login",
  inject: ["auth"],
  mounted() {
    this.emit('mounted', 'login')
  },
  data() {
    return {
      username: "kuba",
      password: "admin"
    }
  },
  methods: {
    onClick() {
      this.emit('send-http-request', '/security/authenticate', 'POST', this.getUser(), this.respond)
    },
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    clearForm() {
      this.username = ""
      this.password = ""
    },
    getUser() {
      return JSON.stringify(
          {
            "username": this.username,
            "password": this.password
          }
      )
    },
    respond(responseText) {
      if (responseText.startsWith("token:")) {
        this.emit('login', responseText.substring(responseText.indexOf(":") + 1))
      } else {
        alert(responseText)
      }
    }
  }
}
</script>

<style scoped>
</style>