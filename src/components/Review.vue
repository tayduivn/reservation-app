<template>
  <div class="ui basic center aligned segment">
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        Review
        <div class="sub header">
          Make sure we've got everything right
        </div>
      </div>
    </div>
    <div class="ui basic segment">
      <div class="ui items">
        <div class="item" v-if="organization">
          <div class="content">
            <div class="header">{{ organization.name }} <div class="ui black label">{{ organization.type }}</div></div>
            <div class="meta">Organization</div>
          </div>
        </div>
        <div class="item" v-else>
          <div class="content">
            <div class="header">{{ new_organization.name }}</div>
            <div class="meta">Organization</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">{{ teacher.first_name }} {{ teacher.last_name }}</div>
            <div class="meta">Group Leader</div>
          </div>
        </div>
        <div class="item" v-for="show in selected_shows" :key="show.id">
          <div class="image">
            <img :src="show.cover">
          </div>
          <div class="content">
            <div class="header">{{ show.name }}</div>
            <div class="meta">
              <div class="ui black label">{{ show.type }}</div>
              <div class="ui black label">{{ show.duration }} minutes</div>
            </div>
            <div class="meta">
              <div class="ui basic blue label">
                {{ attendance.students }} students
              </div>
              <div class="ui basic blue label">
                {{ attendance.teachers }} teachers
              </div>
              <div class="ui basic large blue label" v-if="attendance.parents > 0">
                {{ attendance.parents }} parents
              </div>
            </div>
            <div class="description">
              <p>{{ show.description }}</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="image">
            <img :src="post_show.cover">
          </div>
          <div class="content">
            <div class="header">{{ post_show.name }}</div>
            <div class="meta">{{ post_show.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'teacher-info' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <sui-button color="green" size="huge" @click.prevent="handleSubmit">
      <i class="check icon"></i>
      Submit
    </sui-button>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  export default {
    computed: {
      selected_shows()   { return this.$store.state.selected_shows },
      attendance()       { return this.$store.state.attendance },
      organization()     { return this.$store.state.organization },
      new_organization() { return this.$store.state.new_organization },
      teacher()          { return this.$store.state.teacher },
      post_show()        { return this.$store.state.post_show }
    },
    methods: {
      format,
      handleSubmit() {
        // submit data

        // go to thank you page
        this.$router.push({ name: 'thank-you' })
      }
    },
  }
</script>