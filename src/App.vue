<template>
  <div>
    <HeaderMain class="center"/>
    <Login/>
  </div>
</template>

<script>

import Login from "@/components/Login";
import HeaderMain from "@/components/Header-Main";

export default {
  name: 'App',
  methods: {
    serverUrl() {
      return "https://automotive-therapy.herokuapp.com"
    },
    createURL(endpoint) {
      return this.serverUrl() + endpoint
    },

    sendRequest(endpoint, method, body, onComplete) {
      const request = new XMLHttpRequest()
      request.open(method, this.createURL(endpoint))
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(body)
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          onComplete(request.responseText)
        }
      }
    }
  },

  components: {
    HeaderMain,
    Login
  }
}
</script>

<style>

</style>
