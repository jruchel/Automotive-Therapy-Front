<template>
  <div>
    <form>
      <label for="emailInput">Adres email:</label><br>
      <input id="emailInput" type="text" v-model="Client.email"/><br>
      <label for="phoneInput">Podaj numer telefonu(opcjonalne):</label><br>
      <input id="phoneInput" type="number" v-model="Client.phoneNumber"/><br>
      <label for="descriptionInput">Opisz swoje zlecenie (model pojazdu, co się zepsuło itd.):</label><br>
      <textarea class="descriptionInput" id="descriptionInput" v-model="Order.description"></textarea><br>
    </form>
    <button @click="sendForm">Wyślij</button>
  </div>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: "OrderForm",
  methods: {
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    validateForm() {
      let email = this.Client.email
      let phone = this.Client.phoneNumber
      let descritpion = this.Order.description
      if (email === "" || email === null) {
        return "Email nie może być pusty."
      }
      if (phone !== "" && !new RegExp("\\d{9}").exec(phone)) {
        return "Niepoprawny numer telefonu"
      }
      if (descritpion === "" || descritpion === null || descritpion.length < 5) {
        return "Opis nie może być pusty"
      }
      if (descritpion.length > 500) {
        return "Zbyt długi opis, co najwyżej 500 znaków."
      }
      return true
    },
    sendForm() {
      let validationResult = this.validateForm()
      if (validationResult === true) {
        this.emit("send-http-request", "/orders/add", "POST", this.getData(), this.processResponse)
      } else {
        alert(validationResult)
      }
    },
    processResponse(response) {
      alert(response)
    },
    getData() {
      return JSON.stringify({
        client: this.Client,
        order: this.Order
      })
    }
  },
  data() {
    return {
      Client: {
        email: "",
        phoneNumber: "",
        newsletter: false
      },
      Order: {
        description: ""
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