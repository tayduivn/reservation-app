export default {
  state: {
    hasErrors: false,
    errors   : [],

  },
  mutations: {
    SET_ERRORS(state, payload) {
      state.errors.push(payload)
      Object.assign(state, { hasErrors: state.errors.length > 0 })
    },
    SET_HAS_ERRORS(state, payload) {
      Object.assign(state, { hasErrors: payload })
    },
    CLEAR_ERRORS(state) {
      Object.assign(state, { errors: [] })
    }
  },
  actions: {
    
  }
}