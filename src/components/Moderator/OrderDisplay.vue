<template>
  <div>
          <label for="description">Opis: </label><br>
          <textarea id="description" readonly="readonly" v-model="Order.description"></textarea><br>
          <label for="date">Data: </label><br>
          <input id="date" type="text" readonly="readonly" v-model="Order.date"><br>
          <label for="status">Status: </label><br>
          <input id="status" type="text" readonly="readonly" v-model="Order.status"><br>

  </div>
</template>

<script>


export default {
  name: "Order",
  props: ["Order"],
}
</script>

<style scoped>
textarea {
  width: 20%;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
  height: 100%;
  resize: none;
}
</style>