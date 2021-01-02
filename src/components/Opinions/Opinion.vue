<template>
  <div :style="cssProps">
    <label for="name">Nazwa: </label>
    <input id="name" class="nameInput" type="text" readonly="readonly" v-model="Opinion.name">
    <label for="rating"> Ocena: </label>
    <input class="ratingInput" id="rating" type="text" readonly="readonly" v-model="Opinion.stars"><br>
    <label for="description">Opis: </label><br>
    <textarea id="description" class="descriptionInput" v-model="Opinion.description" readonly="readonly"></textarea>
  </div>
</template>

<script>
export default {
  name: "Opinion",
  mounted() {
    console.log(this.Opinion.stars)
  },
  data() {
    return {
      cssProps: {
        backgroundImage: `url(${require('@/assets/border-frame.png')})`,
        "background-size": "cover",
        "padding":"5px"
      }
    }
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

.ratingInput {
  width: 25px;
}

.descriptionInput {
  width: 90%;
  height: 100px;
  resize: none;
}

</style>