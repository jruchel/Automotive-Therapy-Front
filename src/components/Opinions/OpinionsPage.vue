<template>
  <div>
    <h2 v-if="this.opinions.length > 0">Opinie naszych klientów: </h2><br>
    <table>
      <tr>
        <td v-for="opinion in opinions" v-bind:key="opinion.id">
          <Opinion class="opinion" :Opinion="opinion"/>
        </td>
      </tr>
    </table>
    <h2>Wyślij swoją opinię:</h2><br>
    <OpinionForm v-on:opinion-sent="getOpinions"/>
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
    this.emit('mounted', 'opinion')
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
.opinion {
  margin: 10px 10px 10px 10px;
  width: 175px;

}
</style>