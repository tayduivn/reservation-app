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
      <h4 class="ui horizontal divider header">
        Organization & Teacher
      </h4>
      <div class="ui two column grid">
        <div class="column">
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
          </div>
        </div>
        <div class="column">
          <div class="ui items">
            <div class="item">
              <div class="content">
                <div class="header">{{ teacher.first_name }} {{ teacher.last_name }}</div>
                <div class="meta">Group Leader</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="ui horizontal divider header">
        Shows
      </h4>
      <div :class="selected_shows.length == 1 ? 'ui one column grid' : 'ui two column grid'">
        <div class="column" v-for="show in selected_shows" :key="show.id">
          <div class="ui items">
            <div class="item">
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
          </div>
        </div>
      </div>
      <h4 class="ui horizontal divider header">
        Post Show
      </h4>
      <div class="ui one column grid">
        <div class="ui large header">
          <img :src="post_show.cover">
          <div class="content">
            {{ post_show.name }}
            <div class="sub header">
              {{ post_show.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui form">
      <div class="field">
        <label>Notes</label>
        <textarea rows="3" v-model="memo" v-if="special_needs" placeholder="Explain special needs or enter any special requests or comments about your reservation."></textarea>
        <textarea rows="3" v-model="memo" v-else placeholder="Enter any special requests or comments about your reservation."></textarea>
      </div>
    </div>
    <br><br>
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
  
  import { format, parseISO } from 'date-fns'
  import axios from  'axios'
  
  export default {
    computed: {
      selected_shows()   { return this.$store.state.selected_shows },
      attendance()       { return this.$store.state.attendance },
      organization()     { return this.$store.state.organization },
      new_organization() { return this.$store.state.new_organization },
      teacher()          { return this.$store.state.teacher },
      post_show()        { return this.$store.state.post_show },
      special_needs()    { return this.$store.state.special_needs },
      times()            { return this.$store.state.times },
      memo: {
        set(value) { this.$store.commit('SET_MEMO', value) },
        get() { return this.$store.state.memo },
      },
    },
    methods: {
      format,
      async handleSubmit() {
        const events = this.times.map((date, i) => ({
          date,
          show_id: this.selected_shows[i].id,
        }))
        // submit data
        const data = {
          // School Info
          schoolId : this.organization.id,
          school   : this.new_organization.name,
          address  : this.new_organization.address,
          city     : this.new_organization.city,
          state    : this.new_organization.state,
          zip      : this.new_organization.zip,
          phone    : this.new_organization.phone,
          // Teacher Info
          firstname: this.teacher.first_name,
          lastname : this.teacher.last_name,
          email    : this.teacher.email,
          cell     : this.teacher.phone,
          // Event Info

          // Attendance
          students : Number(this.attendance.students),
          teachers : Number(this.attendance.teachers),
          parents  : Number(this.attendance.parents),
          // Shows:
          events,
          // Post Show
          postShow: this.post_show.name,
          // Memo
          memo : this.memo,
          // Taxable
          taxable       : !this.$store.state.taxable,
          special_needs : this.special_needs,
        }

        try {
          const response = await axios.post(`${SERVER}/api/public/createReservation`, data)
          // go to thank you page
          this.$router.push({ name: 'thank-you' })
        } catch (error) {
          this.$store.commit('SET_ERRORS', 'Unable to send your reservation at this moment.')
        }

        console.log(data.events)
        
      }
    },
  }
</script>

<style scoped>
  textarea { font-family: inherit !important }
</style>
