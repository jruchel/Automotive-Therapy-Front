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
    <button class="submit-btn" @click="emit('send-http-request', '/security/login', 'POST', getUser(), respond)"
            v-on:click="clearForm">Login
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
      console.log(this)
      if (responseText === "true") {
        alert("Login successful!")
      } else {
        alert("Wrong user details")
      }
    }
  }
}
</script>

<style scoped>
</style>