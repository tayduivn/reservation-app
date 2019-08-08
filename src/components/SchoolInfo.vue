<template>
  <div class="ui basic center aligned segment">
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        School Info
        <div class="sub header">
          Find your school in the dropdown below
        </div>
      </div>
    </div>
    <sui-dropdown fluid search selection :options="organizations" v-model="organization"
                  placeholder="Type and select the name of your school or select the last option if you can't find it"></sui-dropdown>
    <br><br>
    <div class="ui form" v-show="organization == 0">
      <div class="two fields">
        <div class="field">
          <label>School Name</label>
          <input type="text" placeholder="School Name (do not abbreviate)" v-model="new_organization.name" />
        </div>
        <div class="field">
          <label>School Address</label>
          <input placeholder="School Address" type="text" v-model="new_organization.address" />
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>City</label>
          <input placeholder="City" type="text" v-model="new_organization.city">
        </div>
        <div class="field">
          <label>State</label>
          <input type="text" v-model="new_organization.state" readonly>
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>ZIP</label>
          <input type="text" placeholder="ZIP" v-model="new_organization.zip">
        </div>
        <div class="field">
          <label>Phone</label>
          <input type="text" placeholder="Phone" v-model="new_organization.phone">
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'post-show' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <sui-button primary size="huge" :disabled="!isValid" @click="$router.push({ name: 'teacher-info' })">
      Next
      <i class="right chevron icon"></i>
    </sui-button>
  </div>
</template>

<script>
  
  import axios from 'axios'
  
  export default {
    data: () => ({
      organizations: [],
    }),
    async created() {
      await this.fetchOrganizations()
    },
    computed: {
      organization: {
        set(value) { this.$store.commit('SET_ORGANIZATION', value) },
        get() { return this.$store.state.organization }
      },
      new_organization: {
        set(value) { this.$store.commit('SET_NEW_ORGANIZATION', value) },
        get() { return this.$store.state.new_organization }
      },
      isValid() {
        return this.new_organization.name.length > 2 && this.new_organization.address.length > 2
      },
    },
    methods: {
      async fetchOrganizations() {
        try {
          const response = await axios.get(`${SERVER}/api/organizations`)
          const no_school = { text: 'My school is not on the list', value: 0, key: 0 }
          let organizations = response.data.map(organization => ({ text: organization.name, value: organization.id, key: organization.id }))
          organizations.push(no_school)
          Object.assign(this, { organizations } )
        } catch (error) {
          this.$store.commit('SET_ERRORS', error.message)
        }
      }
    }
  }
</script>
