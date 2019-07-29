<template>
  <div class="ui fluid container">
    <div class="ui grid">
      <div class="four wide column">
        <sui-step-group size="small" vertical :steps="steps" />
      </div>
      <div class="twelve wide column">
        <div class="ui basic center aligned segment">
          <h1 class="ui huge header">
            Welcome to our universe!
            <br><br>
            <div class="sub header">
              We'll ask you few questions about your field trip in order to get all the information we 
              need to provide the best experience for you and your group. Thank you for choosing us!
            </div>
          </h1>
          <div class="ui huge primary button">
            <i class="thumbs up icon"></i>
            I am ready to start!
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    data : () => ({
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
      ]
    })
  }
</script>

<style>
  .ui.fluid.container { height : 100% !important }
</style>


