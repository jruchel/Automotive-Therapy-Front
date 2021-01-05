<template>
  <div>
    <label for="date">Data: </label><br>
    <input id="date" type="text" readonly="readonly" v-model="Order.date"><br>
    <label for="status">Status: </label><br>
    <input id="status" type="text" readonly="readonly" v-model="Order.status"><br>
    <label for="description">Opis: </label><br>
    <textarea id="description" readonly="readonly" v-model="Order.description"></textarea>

  </div>
</template>

<script>
export default {
  name: "Order",
  props: ["Order"]
}
</script>

<style scoped>
textarea {
  width:200px;
  height:100px;
  resize:none
}
</style>