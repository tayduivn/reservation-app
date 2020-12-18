<template>
  <div class="ui basic center aligned segment">
    <div class="ui center aligned huge header">
      <div class="content" style="text-align:center !important">
        Post Show
        <div class="sub header">
          After your {{ $store.state.times.length == 1 ? 'show' : 'shows' }}, we can give you one of 
          the following live presentations. Click on the one you would like to see.
        </div>
      </div>
    </div>
    <div class="ui centered cards">
      <div class="card" v-for="product in products" :key="product.id" @click="post_show = product">
        <div class="image">
          <div class="ui blue right corner label" v-if=" post_show != null && post_show.name == product.name">
            <i class="heart icon"></i>
          </div>
          <img :src="product.cover" alt="">
        </div>
        <div class="content">
          <div class="header">{{ product.name }}</div>
          <div class="description">{{ product.description }}</div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="ui huge basic primary button" @click="$router.push({ name: 'shows' })">
      <i class="left chevron icon"></i>
      Back
    </div>
    <div class="ui huge basic black button" @click="$router.push({ name: 'home' })">
      <i class="refresh icon"></i>
      Start Over
    </div>
    <sui-button primary size="huge" :disabled="!(post_show != null)" @click="$router.push({ name: 'school-info' })">
      Next
      <i class="right chevron icon"></i>
    </sui-button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      products: [],
    }),
    async created() {
      this.fetchProducts()
    },
    computed: {
      post_show: {
        get() { return this.$store.state.post_show },
        set(value) { this.$store.commit('SET_POST_SHOW', value) }
      }
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get(`${SERVER}/api/public/products`)
          Object.assign(this, { products: response.data.data })
        } catch (error) {
          this.$store.commit('SET_ERRORS', error.message)
        }
      }
    }
  }
</script>
