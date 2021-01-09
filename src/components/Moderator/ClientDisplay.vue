<template>
  <div>
    <div id="inputs">
      <div>
        <label for="email">Mail:</label><br>
        <input id="email" type="text" readonly="readonly" v-model="Client.email"><br>
      </div>
      <div v-if="hasPhone">
        <label for="phone">Telefon:</label><br>
        <input id="phone" type="text" readonly="readonly" v-model="Client.phoneNumber"><br>
      </div>
      <div>
        <label for="lastOrder">Ostatnie zamówienie:</label><br>
        <input id="lastOrder" type="text" readonly="readonly" v-model="Client.lastOrder">
      </div>
    </div>
    <div id="buttons">
      <button @click="switchOrders" v-if="!expanded">Rozwiń</button>
      <button @click="switchOrders" v-if="expanded">Zwiń</button>
    </div>
    <div id="orders" v-if="expanded">
      <div v-for="order in Client.orders" v-bind:key="order.id">
        <div v-if="order.status === status">
          <Order :Order="order"/>
          <div id="options1" v-if="status === 'pending'">
            <button @click="handleOrder(order, '/moderator/orders/accept')">Zaakceptuj</button>
            <button @click="handleOrder(order, '/moderator/orders/reject')">Odrzuć</button>
          </div>
          <div id="options2" v-if="status === 'accepted'">
            <button @click="handleOrder(order, '/moderator/orders/complete')">Oznacz jako wykonane</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "@/components/Moderator/OrderDisplay";
import EventBus from "@/event-bus";

export default {
  name: "Client",
  components: {Order},
  props: ["Client", "status"],
  mounted() {
    this.hasPhone = this.hasPhoneCheck()
    if (this.status !== null && this.status !== '') {
      this.Client.orders = this.getOrdersByStatus(this.status)
    }
  },
  data() {
    return {
      expanded: false,
      hasPhone: false
    }
  },
  methods: {
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    handleOrder(order, endpoint) {
      this.emit("send-http-request", endpoint, "POST", order.id,  this.refreshOrders)
    },
    getOrders(fun) {
      return this.Client.orders.filter(fun)
    },
    getOrdersByStatus(status) {
      return this.getOrders(function (order) {
        return order.status === status
      })
    },
    refreshOrders() {
      this.$emit("orders-refresh")
    },
    switchOrders() {
      this.expanded = !this.expanded
    },
    hasPhoneCheck() {
      let phone = this.Client.phoneNumber
      return !(phone === '' || phone === 'unidentified' || phone === null)
    }
  }
}
</script>

<style scoped>

</style>