<script>
import {Pie} from 'vue-chartjs'
import EventBus from "@/event-bus";


export default {
  extends: Pie,
  data: () => ({
    data: {
    },
    options: {
    }
  }),
  computed: {
    chartData: function () {
      return this.data
    }
  },
  methods: {
    emit(event, ...args) {
      EventBus.$emit(event, args)
    },
    getData() {
      this.emit("send-http-request", "/data/opinions", "GET", "", this.processResponse)
    },
    processResponse(response) {
      response = JSON.parse(response)
      this.options = response.options
      delete response.options
      this.data = response
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    this.getData()
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>
</style>