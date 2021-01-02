<template>
  <div>
    <HeaderMain class="center"/>
    <Navigation v-on:logout="logout"></Navigation>
    <Footer/>
  </div>
</template>

<script>

import HeaderMain from "@/components/Header-Main";
import Navigation from "@/components/Navigation";
import EventBus from "@/event-bus";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  mounted() {
    EventBus.$on('send-http-request', args => {
      this.sendRequest(args[0], args[1], args[2], args[3])
    })
    EventBus.$on('login', args => {
      this.processLogin(args[0])
    })
  },
  provide() {
    return {
      auth: this.auth,
      user: {"username": "kuba", "password": "admin1"},
      serverUrl: "https://automotive-therapy.herokuapp.com"
    }
  },
  data() {
    return {
      auth: {loggedIn: false, token: "12345"}
    }
  },
  methods: {
    logout() {
      this.auth.loggedIn = false
      this.auth.token = ""
      this.sendRequest("/security/logout", "POST", "")
    },
    serverUrl() {
      return "https://automotive-therapy.herokuapp.com"
    },
    createURL(endpoint) {
      return this.serverUrl() + endpoint
    },
    processLogin(token) {
      this.auth.loggedIn = true
      this.auth.token = token
      console.log(this.auth.loggedIn)
    },
    sendRequest(endpoint, method, body, onComplete) {
      const request = new XMLHttpRequest()
      request.open(method, this.createURL(endpoint))
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      if (body !== null && body !== "") {
        request.send(body)
      } else {
        request.send()
      }
      request.onreadystatechange = function () {
        if (request.readyState === 4 && onComplete != null && onComplete !== 'undefined') {
          onComplete(request.responseText)
        }
      }
    }
  },

  components: {
    Footer,
    Navigation,
    HeaderMain,
  }
}
</script>

<style>

</style>
