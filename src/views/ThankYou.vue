<template>
  <div class="ui basic center aligned segment">
    <i class="massive thumbs up green icon"></i>
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        We got it, {{ teacher.first_name }}!
        <div class="sub header">
          We will contact you about your reservation within the next two business days. If we don't, 
          email planetarium@ctcd.edu or call 254-526-1768.
        </div>
      </div>
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
  </div>
</template>

<script>
  export default {
   computed: {
     organization()   { return this.$store.state.organization },
      teacher()       { return this.$store.state.teacher },
   } 
  }
</script>