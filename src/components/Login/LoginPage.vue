<template>
  <div class="content">
    <form method="post">
      <div class="txt_field">
        <label for="usernameInput">Username: </label><br>
        <input class="input" id="usernameInput" type="text" v-model="username"><br>
      </div>
      <div class="txt_field">
        <label for="passwordInput">Password: </label><br>
        <input type="password" v-model="password" id="passwordInput"><br>
      </div>
    </form>
    <button class="submit-btn" @click="emit('send-http-request', '/security/authenticate', 'POST', getUser(), respond)">
      Login
    </button>
  </div>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: "Login",
  data() {
    return {
      username: "kuba",
      password: "admin"
    }
  },
  methods: {
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