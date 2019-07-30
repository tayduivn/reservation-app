<template>
  <div class="ui basic center aligned segment">
    <h1>Attendance</h1>
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
