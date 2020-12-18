<template>
  <div class="ui basic center aligned segment">
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        Teacher Info
        <div class="sub header">
          We need your information
        </div>
      </div>
    </div>
    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>First Name</label>
          <input type="text" v-model="teacher.first_name" placeholder="First Name">
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="text" v-model="teacher.last_name" placeholder="Last Name">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>Email</label>
          <input type="email" v-model="teacher.email" placeholder="Email">
        </div>
        <div class="field">
          <label>Phone</label>
          <the-mask :mask="['(###) ###-####']" masked v-model="teacher.phone" placeholder="Phone"></the-mask>
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'school-info' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <sui-button primary size="huge" :disabled="!isValid" @click="$router.push({ name: 'review' })">
      Review
      <i class="right chevron icon"></i>
    </sui-button>
  </div>
</template>

<script>
  export default {
    data: () => ({
      
    }),
    watch: {
      teacher: {
        deep: true,
        handler: function() { this.$store.commit('SET_TEACHER', this.teacher) }
      }
    },
    computed: {
      teacher: {
        get() { return this.$store.state.teacher },
        set(value) { this.$store.commit('SET_TEACHER', value) }
      },
      isValid() {
        return this.teacher.first_name.length  > 1 &&
              this.teacher.last_name.length    > 1 &&
              this.teacher.email.includes('@')     &&
              this.teacher.email.length        > 5 &&
              this.teacher.phone.length        == 14
      },
    },
  }
</script>

