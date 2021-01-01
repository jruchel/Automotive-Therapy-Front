<template>
  <div class="content">
    <form method="post">
      <div class="txt_field">
        <label for="usernameInput">Username: </label><br>
        <input class="input" id="usernameInput" type="text"><br>
      </div>
      <div class="txt_field">
        <label for="passwordInput">Password: </label><br>
        <input class="input" id="passwordInput" type="password"><br>
      </div>
    </form>
    <button class="submit-btn" v-on:click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$parent.$options.methods.sendRequest("/security/login", "POST", this.getUser(), this.respond)
    },
    getUser() {
      let username = document.getElementById("usernameInput").value
      let password = document.getElementById("passwordInput").value
      return JSON.stringify(
          {
            "username": username,
            "password": password
          }
      )
    },
    respond(responseText) {
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