<template>
  <div class="ui basic center aligned segment">
    <div class="ui huge center aligned header">
      <div class="content">Date</div>
      <div class="sub header">
        {{ date }}
      </div>
    </div>
    <div class="ui grid">
      <div class="ui five wide column">
        <flatpickr placeholder="Click here and select a date"
                    v-model="date"
                    :config="config"
                    @input="queryEvents">
      </div>
      <div class="ui eleven wide column">

      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'attendance' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <div class="ui huge primary button" @click="$router.push({ name: 'number-of-shows' })">
      Next
      <i class="right chevron icon"></i>
    </div>
  </div>
</template>

<script>
  
  import axios from 'axios'
  import flatpickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'

  export default {
    data: () => ({
      config: {
        dateFormat: "l, F j, Y",
        minDate   : "today",
        inline    : true,
      },
    }),
    components: {
      flatpickr,
    },
    computed: {
      date: {
        get() { return this.$store.state.date },
        set(value) { return this.$store.dispatch('SET_DATE', value) }
      }
    },
    methods: {
      async queryEvents() {
        try {
          const seats = this.$store.getters.seats
          const response = await axios.get(`${SERVER}/api/public/findAvailableEvents?date=${this.date}&seats=${seats}`)
        } catch(error) {
          this.$store.commit('SET_ERRORS', error.message)
        }
      }
    }
  }
</script>

<style>
  .flatpickr-input { display : none !important }
</style>

