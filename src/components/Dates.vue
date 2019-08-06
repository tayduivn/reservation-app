<template>
  <div class="ui basic center aligned segment">
    <div class="ui huge center aligned header">
      <div class="content">Date</div>
      <div class="sub header">
        {{ format(new Date(date), 'EEEE, MMMM d, yyyy') }}
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
        <div class="ui dividing centered header">
          <i class="calendar alternate icon"></i>
          <div class="content">
            {{ date == null ? "Select a date" : date }}
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
    <div class="ui huge primary button" @click="$router.push({ name: 'number-of-shows' })">
      Next
      <i class="right chevron icon"></i>
    </div>
  </div>
</template>

<script>
  
  import axios from 'axios'
  import { format, startOfDay, endOfDay } from 'date-fns'
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
          minDate   : this.$store.state.date,
          inline    : true,
        },
        isLoadingEvents: false,
        fetchFailed: false,
        events: [],
      }
    },
    components: {
      flatpickr,
    },
    computed: {
      date: {
        get() { return this.$store.state.date },
        set(value) { return this.$store.dispatch('SET_DATE', value) }
      },
      // Filtering Events
      filteredEvents() {

        // Create a schedule of available shows for every possible show time
        let mockEvents = times.map(time => ({
          title     : "Available",
          start     : startOfDay(new Date(this.date)),
          end       : endOfDay(new Date(this.date)),
          isSelected: false,
        }))

        console.log(mockEvents)

        // Get taken shows from backend
        let scheduledEvents = this.events

        // Will hold schedule of events available and unavailable (if there are any)
        let filteredSchedule = [];

        // If there's a date set
        if (this.date != null)
        {

          mockEvents.forEach(mockEvent => {
            let isTaken = false
            scheduledEvents.forEach(scheduledEvent => {
              if (scheduledEvent.start == mockEvent.start) {
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
          const response = await axios.get(`${SERVER}/api/public/findAvailableEvents?date=${this.date}&seats=${seats}`)
          Object.assign(this, { events: response.data.data })
          this.isLoadingEvents = false
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

