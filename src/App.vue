<template>
  <div class="ui fluid container" id="master">
    <sui-step-group fluid>
      <sui-step v-for="(step, i) in steps"
                :key="i" :icon="step.icon" 
                :title="step.title" 
                :description="step.description"
                :active="$route.meta.step === (i + 1)"
                :completed="$route.meta.step > (i + 1)"
                :disabled="$route.meta.step < (i + 1)" />
    </sui-step-group>

    <div class="ui basic right aligned segment">
      <a href="https://astral.anderfernandes.com" target="_blank" class="ui black tiny image label">
        <img src="https://astral.anderfernandes.com/assets/astral-logo-light.png" alt="">
        Powered by Astral
      </a>
    </div>
    
    <div class="ui basic center aligned segment" v-show="$route.name != 'home' && $route.name != 'review' && $route.name != 'thank-you' ">
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
      <div class="sixteen wide column" id="inner">
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
      'errors': function() {
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

<style>
  #inner, #master { min-height: 100% !important; }
  
  .twelve.wide.column { z-index : 0 !important; display: flex !important; align-items: center !important; width: 80% !important }
  
  .four.wide.column   { z-index : 1 !important; width: 20% !important;   }

  .ui.basic.center.aligned.segment { width: 100% !important }

  .vue-notification { margin: 0 !important }

  #master { 
    background: linear-gradient(
                  rgba(255, 255, 255, 0.9),
                  rgba(255, 255, 255, 0.9),
                  rgba(255, 255, 255, 0.9)
                  ),
                  url('http://www.starsatnight.org/sites/sciencetheater/includes/themes/MaybornSemanticVue/images/cover_full.jpg') !important;
    background-size: cover !important;
  }

  .slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.25s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0)
}

.slide-left-leave-active, 
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0)
}

/** Slider **/
input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

/* Special styling for WebKit/Blink */
input[type=range]::-webkit-slider-thumb {
  height: 1.5em;
  width: 1.5em;
  background: #FFFFFF -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(0, 0, 0, 0.5)));
  background: #FFFFFF -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  background: #FFFFFF linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  border-radius: 100%;
  -webkit-box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15), 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15), 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
  -webkit-transition: background 0.3s ease;
  transition: background 0.3s ease;
  margin-top: -7px;
}

input[type=range]::-webkit-slider-thumb:hover {
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.05);
  height: 0.4em;
  border-color: white;
}
  
</style>