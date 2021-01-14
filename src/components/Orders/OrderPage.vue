<template>
  <div>
    <h1>Złóż zamówienie</h1>
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