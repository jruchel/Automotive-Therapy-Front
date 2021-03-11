<template>
  <div>
    <h2 style="text-align: center">Złóż zamówienie</h2>
    <OrderForm/>
  </div>
</template>

<script>
import OrderForm from "@/components/Orders/OrderForm";
import EventBus from '@/event-bus'

export default {
  name: "About",
  components: {OrderForm},
  mounted() {
    this.emit('mounted', 'order')
  },
  methods : {
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
  }
}
</script>

<style scoped>

</style>