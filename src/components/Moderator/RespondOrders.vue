<template>
  <div>
    <div v-if="this.auth.loggedIn" id="loggedin">
      <ul v-for="client in clients" v-bind:key="client.id">
        <li>{{ client }}</li>
      </ul>
    </div>
    <NotLoggedIn v-if="!this.auth.loggedIn"/>
  </div>
</template>

<script>

import EventBus from "@/event-bus";
import NotLoggedIn from "@/components/Login/NotLoggedIn";

export default {
  name: "RespondOrders",
  components: {NotLoggedIn},
  mounted() {
    this.getUnrespondedOrders()
  },
  inject: ["auth"],
  data() {
    return {
      clients: []
    }
  },
  methods: {
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    getUnrespondedOrders() {
      this.emit("send-http-request", "/moderator/clients/unresponded", "GET", "", this.setCurrentClients)
    },
    getUncompletedOrders() {
      this.emit("send-http-request", "/moderator/clients/uncompleted", "GET", "", this.setCurrentClients)
    },
    setCurrentClients(response) {
      this.clients = []
      this.clients.push(JSON.parse(response))
    }
  }
}
</script>

<style scoped>

</style>