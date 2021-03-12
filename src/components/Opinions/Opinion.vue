<template>
  <div>
    <label for="name">Nazwa: </label>
    <input id="name" class="nameInput" type="text" readonly="readonly" v-model="Opinion.name">
    <label for="rating"> Ocena: </label>
    <input class="ratingInput" id="rating" type="text" readonly="readonly" v-model="Opinion.stars"><br>
    <label for="description">Opis: </label><br>
    <textarea id="description" class="desctiption" v-model="Opinion.description" readonly="readonly"></textarea>
  </div>
</template>

<script>
export default {
  name: "Opinion",
  mounted() {
    console.log(this.Opinion.stars)
  },
  props: {
    Opinion: {
      id: 0,
      description: "",
      name: "",
      stars: 5
    }
  }
}
</script>

<style scoped>

.nameInput {
  width: 50px;
}

.desctiption {
  resize: none;
  height: 100%;
  width: 85%;
}

.ratingInput {
  width: 25px;
}



</style>