<template>
  <div class="ui basic center aligned segment">
    <h1>Attendance</h1>
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
          <div class="ui huge centered header">{{ attendance.students }}</div>
          <input type="range" min="0" max="180" v-model="attendance.students">
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
          <div class="ui huge centered header">{{ attendance.teachers }}</div>
          <input type="range" min="0" max="30" v-model="attendance.teachers">
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
          <div class="ui huge centered header">{{ attendance.parents }}</div>
          <input type="range" min="0" max="60" v-model="attendance.parents">
          <div class="ui pointing basic label">Slide left or right to change numbers</div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name : 'home' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <div class="ui huge primary button">
      Next
      <i class="right chevron icon"></i>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      attendance : {
        students : 0,
        teachers : 0,
        parents  : 0,
      }
    })
  }
</script>

