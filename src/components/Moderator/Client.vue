<template>
  <div>
    <input type="text" readonly="readonly" v-model="Client.email">
    <input type="text" readonly="readonly" v-model="Client.phone">
    <input type="text" readonly="readonly" v-model="Client.lastOrder">
    <div v-for="order in Client.orders" v-bind:key="order.id">
      <Order :Order="order"/>
    </div>
  </div>
</template>

<script>
import Order from "@/components/Moderator/Order";
export default {
  name: "Client",
  mounted() {
    console.log(this.Client)
  },
  components: {Order},
  props: ["Client"],
}
</script>

<style scoped>

</style>