<template>
  <div>
    <h2>Opinie naszych klientów: </h2><br>
    <table>
      <tr>
          <td v-for="opinion in opinions" v-bind:key="opinion.id">
            <Opinion v-on:opinion-sent="getOpinions" :Opinion="opinion"/>
          </td>
      </tr>
    </table>
    <h2>Wyślij swoją opnię:</h2><br>
    <OpinionForm/>
  </div>
</template>

<script>
import EventBus from '@/event-bus'
import Opinion from "@/components/Opinions/Opinion";
import OpinionForm from "@/components/Opinions/OpinionForm";

export default {
  name: "OpinionsPage",
  components: {OpinionForm, Opinion},
  mounted() {
    this.getOpinions()
  },
  methods: {
    getOpinions() {
      this.emit("send-http-request", "/opinions/get", "GET", "", this.setOpinions)
    },
    setOpinions(response) {
      this.opinions = JSON.parse(response)
    },
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
  },
  data() {
    return {
      opinions: []
    }
  }
}
</script>

<style scoped>

</style>