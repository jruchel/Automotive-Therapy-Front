<template>
  <div>
    <HeaderMain class="content"/>
    <Navigation class="content" v-on:logout="logout"></Navigation>
  </div>
</template>

<script>

import HeaderMain from "@/components/Header-Main";
import Navigation from "@/components/Navigation";
import EventBus from "@/event-bus";


export default {
  name: 'App',
  mounted() {
    EventBus.$on('mounted', args => {
      this.$children[1].setCurrentPage(args[0])
    })
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
      serverUrl: "https://automotive-therapy.herokuapp.com",
    }
  },
  data() {
    return {
      auth: {loggedIn: false, token: "12345"},
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
    },
    sendRequest(endpoint, method, body, onComplete) {
      let request = new XMLHttpRequest()
      request.open(method, this.createURL(endpoint))
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      if (this.auth.loggedIn) {
        request.setRequestHeader("auth", this.auth.token)
      }
      request.send(body)

      let read = false
      request.onreadystatechange = function () {
        if (request.readyState === 4 && onComplete != null && onComplete !== 'undefined' && request.responseText !== '' && !read) {
          onComplete(request.responseText)
          read = true
        }
      }
    }
  },
  components: {
    Navigation,
    HeaderMain,
  }
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
body {
  background-image: url(assets/background.jpg);
  background-size: cover;
}

* {
  font-family: Hack, monospace;
  outline: none;
}

input {
  box-shadow:4px 4px 10px rgba(0,0,0,0.06);
  padding:15px;
  border-radius:10px;
  border: 0;
}
textarea {
  width:100%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:4px 4px 10px rgba(0,0,0,0.06);
  height:150px;
}

button{
  background: royalblue;
  width: 80px;
  height: 35px;
  color: #ffffff;
  cursor: pointer;
  border: 0;
  border-radius: 10px;
}

.content {
  max-width: 500px;
  margin: auto;
}
</style>
