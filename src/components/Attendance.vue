<template>
  <div class="ui basic center aligned segment">
    <div class="ui center aligned huge header">
      <div class="content">
        Attendance
        <div class="sub header">We have {{ $store.state.capacity }} seats</div>
      </div>
    </div>
    <div class="ui three column grid">
      <div class="column">
        <div class="ui segment">
          <img src="/assets/student.svg"
                class="ui centered small image">
          <div class="ui header">
            How many students?
            <div class="sub header">
              We require a <strong>minimum of paying 20 tickets</strong> to book a field trip.
            </div>
          </div>
          <div class="ui huge centered header">{{ students }}</div>
          <input type="range" min="0" :max="capacity" v-model.number="students">
          <div class="ui pointing basic label">Slide left or right to change numbers</div>
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <img src="/assets/teacher.svg"
                class="ui centered small image">
          <div class="ui header">
            How many teachers?
            <div class="sub header">
              Chaperones and bus drivers also go here. For every 10 students, one teacher is free.
            </div>
          </div>
          <div class="ui huge centered header">{{ teachers }}</div>
          <input type="range" min="0" :max="capacity" v-model.number="teachers">
          <div class="ui pointing basic label">Slide left or right to change numbers</div>
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <img src="/assets/parent.svg" alt="" class="ui centered small image">
          <div class="ui header">
            How many parents?
            <div class="sub header">
              Include parents in the count below
              <strong>only if they are not paying for their own tickets</strong>.
            </div>
          </div>
          <div class="ui huge centered header">{{ parents }}</div>
          <input type="range" min="0" :max="capacity" v-model.number="parents">
          <div class="ui pointing basic label">Slide left or right to change numbers</div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'home' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <div class="ui huge primary button" @click="$router.push({ name: 'dates' })">
      Next
      <i class="right chevron icon"></i>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      students: {
        set(value) { this.$store.commit('SET_STUDENTS', value) },
        get() { return this.$store.state.attendance.students    },
      },
      teachers: {
        set(value) { this.$store.commit('SET_TEACHERS', value) },
        get() { return this.$store.state.attendance.teachers    },
      },
      parents: {
        set(value) { this.$store.commit('SET_PARENTS', value) },
        get() { return this.$store.state.attendance.parents    },
      },
      capacity() {
        return this.$store.state.capacity
      },
      attendance() {
        return this.$store.state.attendance.students + this.$store.state.attendance.teachers + this.$store.state.attendance.parents
      },
      RATIO()  { return this.teachers / this.students },
      errors() { return this.$store.state.errors }
    },
    watch: {
      attendance: {
        deep: true,
        handler() {
          if (this.attendance.students < 20) {
            if (!this.errors.includes('Make sure you have at least 20 kids.'))
              this.$store.commit('SET_ERRORS', 'Make sure you have at least 20 kids.')
          } else {
            if (this.errors.length > 0)
              this.$store.commit('REMOVE_ERROR', 'Make sure you have at least 20 kids.')
          }
          if (this.RATIO > 0.1) {
            if (!this.errors.includes('Make sure you have no more than 10 students per teacher.'))
              this.$store.commit('SET_ERRORS', 'Make sure you have no more than 10 students per teacher.')
          } else {
            if (this.errors.length > 0)
              this.$store.commit('REMOVE_ERROR', 'Make sure you have no more than 10 students per teacher.')
          }
          if (this.attendance > this.capacity) {
            if (!this.errors.includes(`We can't seat more than ${this.capacity} people.`))
                this.$store.commit('SET_ERRORS', `We can't seat more than ${this.capacity} people.`)
          } else {
            if (this.errors.length > 0)
              this.$store.commit('REMOVE_ERROR', `We can't seat more than ${this.capacity} people.`)
          }
        }
      }
    }
  }
</script>

