<template>
  <div class="ui basic center aligned segment">
    <div class="ui huge center aligned header">
      <div class="content">Date</div>
    </div>
    <div class="ui grid">
      <div class="six wide column">
        <flatpickr placeholder="Click here and select a date"
                    v-model="date"
                    :config="config"
                    @input="queryEvents">
      </div>
      <div class="ten wide column">
        <div class="ui dividing centered header">
          <i class="calendar alternate icon"></i>
          <div class="content">
            {{ date == null ? "Select a date" : format(new Date(date), 'EEEE, MMMM d, yyyy') }}
          </div>
        </div>
        <!-- Loader Spinning Wheel -->
        <div v-if="isLoadingEvents" class="ui basic segment">
          <br /><br />
          <div class="ui active inverted dimmer">
            <div class="ui text loader">Loading Events...</div>
            <br /><br />
          </div>
        </div>
        <!-- Show alert to chose date -->
        <div class="ui warning icon message" v-else-if="filteredEvents == 0">
          <i class="info circle icon"></i>
          <div class="content">
            <div class="header">
              Select a date!
            </div>
            <p>Please select a date from the calendar.
              </p>
          </div>
        </div>
        <!-- Show alert to chose date -->
        <div class="ui error icon message" v-else-if="fetchFailed">
          <i class="warning circle icon"></i>
          <div class="content">
            <div class="header">
              Error!
            </div>
            <p>
              We are having problems fetchig events from the calendar.
              Please try again in a few minutes.
            </p>
          </div>
        </div>

        <!-- Show events -->
        <div class="ui inverted segment" :key="event.id"
              :class="event.title == 'Available' ? 'blue' : 'red'"
              v-for="event in filteredEvents"
              v-else>
          <div class="ui small inverted header">
            <i class="calendar alternate icon"></i>
            <div class="content">
              <sui-checkbox v-if="event.title == 'Available'" :value="event.start.toISOString()" v-model="times"></sui-checkbox>
              {{ event.title }}
              <div class="sub header">
                {{ format(new Date(event.start), 'hh:mm a') }} - {{ format(new Date(event.end), 'hh:mm a') }}
              </div>
            </div>
          </div>
        </div>
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
    <sui-button primary size="huge" :disabled="!(times.length > 0)" @click="$router.push({ name: 'shows' })">
      Next
      <i class="right chevron icon"></i>
    </sui-button>
  </div>
</template>

<script>
  
  import axios from 'axios'
  import { format, startOfDay, endOfDay, addHours } from 'date-fns'
  import flatpickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'

  // Available show times
  const times = [
    { hour: 9 , minute: 30 },
    { hour: 10, minute: 30 },
    { hour: 11, minute: 30 },
    { hour: 12, minute: 30 },
    { hour: 13, minute: 30 }
  ]

  export default {
    data() {
      return {
        config: {
          dateFormat: "l, F j, Y",
          minDate   : this.$store.state.min_date,
          inline    : true,
        },
        isLoadingEvents: false,
        fetchFailed: false,
        events: [],
      }
    },
    async created() {
      await this.queryEvents()
    },
    components: {
      flatpickr,
    },
    computed: {
      date: {
        get() { return this.$store.state.date },
        set(value) { this.$store.commit('SET_DATE', value) }
      },
      times: {
        get() { return this.$store.state.times },
        set(value) { this.$store.commit('SET_TIMES', value) }
      },
      // Filtering Events
      filteredEvents() {

        // Create a schedule of available shows for every possible show time
        let mockEvents = times.map(time => {
          const date  = new Date(this.date)
          let start   = new Date(date.setHours(time.hour))
          start       = new Date(start.setMinutes(time.minute))
          start       = new Date(start.setSeconds(0))
          const end   = addHours(start, 1)
          return {
            title     : "Available",
            start,
            end,
            isSelected: false,
          }
        })

        // Get taken shows from backend
        let scheduledEvents = this.events

        // Will hold schedule of events available and unavailable (if there are any)
        let filteredSchedule = []

        // If there's a date set
        if (this.date != null)
        {

          mockEvents.forEach(mockEvent => {
            let isTaken = false
            scheduledEvents.forEach(scheduledEvent => {
              if (new Date(scheduledEvent.start).toISOString() === new Date(mockEvent.start).toISOString()) {
                isTaken = true
                filteredSchedule.push(scheduledEvent)
              }
            })
            if (!isTaken)
              filteredSchedule.push(mockEvent)
          })
        }

        return filteredSchedule
      },
      // showTimeOptions
      showTimeOptions() {
        // take out shows marked as "Not Available" and format output for sui-dropdown
        let availableTimes = this.filteredEvents
                              .filter(availableTime => availableTime.title == "Available")
                              .map((availableTime, index) => ({ text: new Date(availableTime.start),
                                                                value: new Date(availableTime.start),
                                                                key: index,
                              }))

        return availableTimes
      },
    },
    methods: {
      format,
      async queryEvents() {
        this.isLoadingEvents = true
        try {
          const seats = this.$store.getters.seats
          const date  = new Date(this.date).toISOString().slice(0, 10)
          const response = await axios.get(`${SERVER}/api/public/findAvailableEvents?date=${date}&seats=${seats}`)
          Object.assign(this, { events: response.data.data })
          this.fetchFailed     = false
          this.isLoadingEvents = false
        } catch(error) {
          this.fetchFailed = true
          this.$store.commit('SET_ERRORS', error.message)
        }
      }
    }
  }
</script>

<style>
  .flatpickr-input { display : none !important }
  .content { text-align: left !important }
</style>

