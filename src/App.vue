<template>
  <div id="app">
    <Navigation class="content" v-on:logout="logout"></Navigation>
    <router-view class="content"/>
    <Footer style="visibility: hidden"/>
  </div>
</template>

<script>

import Footer from "@/components/Footer";
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
      images: {
        githubIcon: require('./assets/github.png')
      }
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
      return "http://localhost:8081"
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
    Footer,
  }
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 1080px;
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
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
  padding: 15px;
  border-radius: 10px;
  border: 0;
}

textarea {
  width: 100%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
  height: 100%;
}

button {
  background: royalblue;
  width: 80px;
  height: 35px;
  color: #ffffff;
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  margin: 5px 5px 5px 0px;
}

.content {
  max-width: 100%;
  margin: auto;
  text-align: center;
}
</style>
