<template>
  <div>
    <div v-if="this.auth.loggedIn" id="loggedin">
      <div v-for="client in clients" v-bind:key="client.id">
        <Client :Client="client"/>
      </div>
    </div>
    <NotLoggedIn v-if="!this.auth.loggedIn"/>
  </div>
</template>

<script>

import EventBus from "@/event-bus";
import NotLoggedIn from "@/components/Login/NotLoggedIn";
import Client from "@/components/Moderator/Client";

export default {
  name: "RespondOrders",
  components: {Client, NotLoggedIn},
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
      this.clients = JSON.parse(response)
    }
  }
}
</script>

<style scoped>

</style>