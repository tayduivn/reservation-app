<template>
  <div class="ui basic center aligned segment">
    <div class="ui huge center aligned header">
      <div class="content">Shows</div>
    </div>
    <div class="ui one column grid">
      <div class="column" v-for="(time, i) in times" :key="i">
        <div class="ui dividing header">
          {{ format(new Date(time), "EEEE, MMMM d, yyyy 'at' hh:mm a") }}
        </div>
        <sui-dropdown fluid :placeholder="`Select Show #${ i + 1 }`" search selection :options="available_shows" @input="handleShowChange" v-model="shows[i]"></sui-dropdown>
        <div class="ui segment">
          <div class="ui items">
            <div class="item" v-if="shows[i]">
              <div class="image">
                <img :src="getShow(shows[i]).cover">
              </div>
              <div class="content">
                <div class="header">{{ getShow(shows[i]).name }}</div>
                <div class="meta">
                  <div class="ui black label">{{ getShow(shows[i]).type }}</div>
                  <div class="ui black label">{{ getShow(shows[i]).duration }} minutes</div>
                </div>
                <div class="description">
                  <p>{{ getShow(shows[i]).description }}</p>
                </div>
              </div>
            </div>
            <div class="item" v-else>
              <div class="image">
                <img src="https://semantic-ui.com/images/wireframe/image.png">
              </div>
              <div class="content">
                <div class="header">Select a show...</div>
                <div class="meta">...from the dropdown above...</div>
                <div class="description">
                  <p>...and read the show description to see if it would fit your group.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'dates' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <sui-button primary size="huge" :disabled="!(shows.length > 0)" @click="$router.push({ name: 'post-show' })">
      Next
      <i class="right chevron icon"></i>
    </sui-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import format from 'date-fns/format'
  
  export default {
    data: () => ({
      available_shows: [],
      all_shows      : [],
      events         : [],
    }),
    async created() {
      await this.fetchShows()
    },
    computed: {
      times() { return this.$store.state.times },
      shows: {
        get() { 
          return this.$store.state.shows 
        },
        set(value) { 
          this.$store.commit('SET_SHOWS', value) 
        }
      }
    },
    methods: {
      format,
      handleShowChange(event) {
        const selected_shows = this.shows.map(show => this.getShow(show), this)
        console.log(selected_shows)
        this.$store.commit('SET_SELECTED_SHOWS', selected_shows)
      },
      async fetchShows() {
        try {
          const response = await axios.get(`${SERVER}/api/public/shows`)
          Object.assign(this, { all_shows: response.data.data })
          Object.assign(this, { 
            available_shows: response.data.data.map(show => ({ key: show.id, text: show.name, value: show.id })) 
          })
        } catch (error) {
          this.$store.commit('SET_ERRORS', error.message)
        }
      },
      getShow(i) {
        let show = this.all_shows.find(show => show.id == i)
        return show 
      }
    }
  }
</script>
