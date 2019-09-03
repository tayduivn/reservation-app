<template>
  <div class="ui fluid container">
    <sui-step-group fluid>
      <sui-step v-for="(step, i) in steps"
                :key="i" :icon="step.icon" 
                :title="step.title" 
                :description="step.description"
                :active="$route.meta.step === (i + 1)"
                :completed="$route.meta.step > (i + 1)"
                :disabled="$route.meta.step < (i + 1)" />
    </sui-step-group>
    
    <div v-show="$route.name != 'home' && $route.name != 'review' && $route.name != 'thank-you' ">
      <div class="ui basic large blue label">
        {{ attendance.students }} students
      </div>
      <div class="ui basic large blue label">
        {{ attendance.teachers }} teachers
      </div>
      <div class="ui basic large blue label" v-if="attendance.parents > 0">
        {{ attendance.parents }} parents
      </div>
      <div class="ui basic large blue label" v-for="(time, i) in times" :key="i">
        <div class="detail" style="margin-left:0">#{{ i + 1 }}</div>
        {{ format(new Date(time), "EEEE, MMMM d, yyyy 'at' hh:mm a") }}
        <div class="detail" v-if="selected_shows[i]">{{ selected_shows[i].name }}</div>
      </div>
      <div class="ui basic large blue label" v-if="post_show">{{ post_show.name }}</div>
    </div>

    <div class="ui grid container">
      <div class="sixteen wide column">
        <notifications :close-on-click="false" width="400">
          <template slot="body" slot-scope="props">
            <div class="ui blue icon message">
              <i class="info circle icon"></i>
              <div class="content">
                <div class="header">Oops...</div>
                <p>{{ props.item.text }}</p>
              </div>
            </div>
          </template>
        </notifications>
        <transition :name="transition" mode="out-in">
          <router-view />
        </transition>
      </div>
      <div class="sixteen wide column" id="info">
        <div class="ui basic right aligned segment">
          <a href="https://astral.anderfernandes.com" target="_blank" class="ui black tiny image label">
            <img src="https://astral.anderfernandes.com/assets/astral-logo-light.png" alt="">
            Powered by Astral
          </a>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

  import format from 'date-fns/format'

  export default {
    data: () => ({
      steps : [
        {
          active      : true,
          disabled    : false,
          icon        : 'info circle',
          title       : 'Welcome!',
          description : 'Start here!',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'users',
          title       : 'Attendance',
          description : 'Who is coming?',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'calendar alternate',
          title       : 'Date',
          description : 'When?',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'film',
          title       : 'Shows',
          description : "What's shows?",
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'star outline',
          title       : 'Post Show',
          description : 'Stars or Planets?',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'university',
          title       : 'School Info',
          description : 'Tell us about your school',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'user',
          title       : 'Teacher Info',
          description : 'We need your info',
        },
      ],
      transition: 'slide-right',
    }),
    computed: {
      errors() { return this.$store.state.errors },
      times() { return this.$store.state.times },
      attendance() { return this.$store.state.attendance },
      selected_shows() { return this.$store.state.selected_shows },
      post_show() { return this.$store.state.post_show }
    },
    methods: {
      format,
    },
    watch : {
      '$route' (to, from) {
        this.transition = to.meta.step < from.meta.step ? 'slide-right' : 'slide-left'
      },
      'errors': function(newValue) {
        this.$notify({ clean: true })
        if (this.errors.length > 0) {
          this.errors.forEach(error => this.$notify({
            text    : error,
            duration: - 100,
          }), this)
        } else {
          this.$notify({ clean: true })
        }
      } 
    }
  }
</script>

<style scoped>
  .ui.fluid.container { height : 100% !important }

  .ui.black.tiny.image.label { position: fixed; bottom: 1rem }
  
  .twelve.wide.column { z-index : 0 !important; display: flex !important; align-items: center !important; width: 80% !important }
  
  .four.wide.column   { z-index : 1 !important; width: 20% !important;   }

  .ui.basic.center.aligned.segment { width: 100% !important }

  .vue-notification { margin: 0 !important }
  
</style>


