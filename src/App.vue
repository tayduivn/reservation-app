<template>
  <div class="ui fluid container">
    <div class="ui grid">
      <div class="four wide column">
        <sui-step-group size="small" vertical :steps="steps" />
      </div>
      <div class="twelve wide column">
        <transition :name="transition" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    
  </div>
</template>

<script>

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
          icon        : 'star',
          title       : 'How many shows?',
          description : 'Most groups go with two!',
        },
        {
          active      : false,
          disabled    : true,
          icon        : 'calendar alternate',
          title       : 'Dates',
          description : 'When is your group coming?',
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
          icon        : 'film',
          title       : 'Shows',
          description : "What's your group watching?",
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
          description : 'We need your school info',
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
    watch : {
      '$route' (to, from) {
        this.transition = to.meta.step < from.meta.step ? 'slide-right' : 'slide-left'
      } 
    }
  }
</script>

<style>
  .ui.fluid.container { height : 100% !important }
  
  .twelve.wide.column { z-index : 0 !important   }
  
  .four.wide.column   { z-index : 1 !important   }
  
</style>


