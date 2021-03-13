<template>
  <div >
    <OpinionsChart></OpinionsChart>
    <OrdersChart></OrdersChart>
  </div>
</template>

<script>
import OpinionsChart from "@/components/Charts/OpinionsChart";
import OrdersChart from "@/components/Charts/OrdersChart";
export default {
  name: "Charts",
  components: {OrdersChart, OpinionsChart}
}
</script>

<style scoped>

</style>