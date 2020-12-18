<template>
  <div class="ui basic segment">
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        School Info
        <div class="sub header">Find your school in the dropdown below</div>
      </div>
    </div>
    <sui-message
      v-show="showAlert"
      warning
      icon="info circle"
      header="We couldn't find your organization in our database."
      content="Please double check the spelling and if you still can't find it, delete whatever you have and select the very last option 'My school is not on the list'."
    ></sui-message>
    <sui-dropdown
      ref="organizations"
      @input.native="toggleShowAlert"
      fluid
      search
      selection
      :options="organizations"
      v-model="organization"
      no-results-message="We don't have info on your school. Please erase whatever you entered here and select the last option."
      placeholder="Type and select the name of your school or select the last option if you can't find it"
    ></sui-dropdown>
    <br />
    <br />
    <div class="ui form" v-show="organization == 0">
      <div class="two fields">
        <div class="field">
          <label>School Name</label>
          <input
            type="text"
            placeholder="School Name (do not abbreviate)"
            v-model="new_organization.name"
          />
        </div>
        <div class="field">
          <label>School Address</label>
          <input
            placeholder="School Address"
            type="text"
            v-model="new_organization.address"
          />
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>City</label>
          <input
            placeholder="City"
            type="text"
            v-model="new_organization.city"
          />
        </div>
        <div class="field">
          <label>State</label>
          <input type="text" v-model="new_organization.state" readonly />
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>ZIP</label>
          <input
            type="text"
            placeholder="ZIP"
            maxlength="5"
            v-model="new_organization.zip"
          />
        </div>
        <div class="field">
          <label>Phone</label>
          <the-mask
            :mask="['(###) ###-####']"
            masked
            v-model="new_organization.phone"
            placeholder="Phone"
          ></the-mask>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="ui form">
      <div class="field">
        <sui-checkbox
          v-model="special_needs"
          label="My group has special needs"
        />
      </div>
      <div class="field">
        <sui-checkbox v-model="taxable" label="My organization is tax exempt" />
      </div>
    </div>
    <br />
    <br />
    <div style="text-align: center">
      <div
        class="ui huge basic primary button"
        @click="$router.push({ name: 'post-show' })"
      >
        <i class="left chevron icon"></i>
        Back
      </div>
      <div
        class="ui huge basic black button"
        @click="$router.push({ name: 'home' })"
      >
        <i class="refresh icon"></i>
        Start Over
      </div>
      <sui-button
        primary
        size="huge"
        :disabled="!isValid"
        @click="$router.push({ name: 'teacher-info' })"
      >
        Next
        <i class="right chevron icon"></i>
      </sui-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      organizations: [],
      phone: null,
      showAlert: false
    }),
    async created() {
      await this.fetchOrganizations()
    },
    watch: {
      organization(newValue) {
        if (newValue == 0) this.showAlert = false
      }
    },
    computed: {
      organization: {
        set(value) {
          this.$store.commit('SET_ORGANIZATION', value)
        },
        get() {
          return this.$store.state.organization
        }
      },
      new_organization: {
        set(value) {
          this.$store.commit('SET_NEW_ORGANIZATION', value)
        },
        get() {
          return this.$store.state.new_organization
        }
      },
      special_needs: {
        set(value) {
          this.$store.commit('SET_SPECIAL_NEEDS', value)
        },
        get() {
          return this.$store.state.special_needs
        }
      },
      taxable: {
        set(value) {
          this.$store.commit('SET_TAXABLE', value)
        },
        get() {
          return this.$store.state.taxable
        }
      },
      isValid() {
        if (this.organization == 0)
          return (
            this.new_organization.name.length > 2 &&
            this.new_organization.address.length > 2 &&
            this.new_organization.city.length > 2 &&
            this.new_organization.state.length > 2 &&
            this.new_organization.zip.length == 5 &&
            this.new_organization.phone.length == 14
          )
        return this.organization != null
      }
    },
    methods: {
      async fetchOrganizations() {
        try {
          const response = await axios.get(`${SERVER}/api/organizations`)
          const no_school = {
            text: 'My school is not on the list',
            value: 0,
            key: 0
          }
          let organizations = response.data.map(organization => ({
            text: organization.name,
            value: {
              id: organization.id,
              name: organization.name,
              type: organization.type.name
            },
            key: organization.id
          }))
          organizations.push(no_school)
          Object.assign(this, { organizations })
        } catch (error) {
          this.$store.commit('SET_ERRORS', error.message)
        }
      },
      toggleShowAlert() {
        if (this.$refs.organizations.filteredOptions.length == 0)
          this.showAlert = true
      }
    }
  }
</script>
