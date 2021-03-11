<template>
  <div>
    <form>
      <label for="name">Imię: </label><br>
      <input id="name" type="text" v-model="Opinion.name"><br><br>
      <label for="rating"> Ocena: </label>
      <select id="rating" name="Ocena" v-model="Opinion.stars">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
        <option value="0">0</option>
      </select>
      <br>
      <br>
      <label for="description">Opis: </label><br>
      <textarea id="description" class="descriptionInput" v-model="Opinion.description"></textarea><br>
    </form>
    <button @click="onSend">Wyślij</button>
  </div>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: "OpinionForm",
  methods: {
    validateInput() {
      let description = this.Opinion.description
      let rating = this.Opinion.stars
      if (description === "" || description.length < 5) {
        return "Opis nie może być pusty."
      }
      if (rating < 0 || rating > 5) {
        return "Ocena musi się mieścić między 0 a 5"
      }
      return true
    },
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    processResponse(response) {
      alert(response)
      this.$emit("opinion-sent")
    },
    onSend() {
      let validationResult = this.validateInput()
      if (validationResult === true) {
        this.emit("send-http-request", "/opinions/post", "POST", JSON.stringify(this.Opinion), this.processResponse)
      } else {
        alert(validationResult)
      }
    }
  },
  data() {
    return {
      Opinion: {
        description: "",
        name: "",
        id: 0,
        stars: 5
      }
    }

  }
}
</script>

<style scoped>

.descriptionInput {
  width: 30%;
  height: 150px;
  resize: none;
}
</style>