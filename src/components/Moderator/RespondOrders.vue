<template>
  <div>
    <ul v-for="client in clients" v-bind:key="client.id">
      <li>{{client}}</li>
    </ul>
  </div>
</template>

<script>

import EventBus from "@/event-bus";

export default {
  name: "RespondOrders",
  mounted() {
    this.getUnrespondedOrders()
  },
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