export default {
  state: {
    hasErrors  : false,
    errors     : [],
    capacity   : 180,
    attendance : {
      students : 20,
      teachers : 2,
      parents  : 0,
    },
    date: new Date().toISOString().slice(0, 10)
  },
  mutations: {
    SET_ERRORS(state, payload) {
      if (!state.errors.includes(payload)) {
        state.errors.push(payload)
        Object.assign(state, { hasErrors: state.errors.length > 0 })
      }
    },
    SET_HAS_ERRORS(state, payload) {
      Object.assign(state, { hasErrors: payload })
    },
    CLEAR_ERRORS(state) {
      Object.assign(state, { errors: [] })
    },
    REMOVE_ERROR(state, payload) {
      if (state.errors.includes(payload)) {
        let errorIndex = state.errors.findIndex(error => error === payload)
        state.errors.splice(errorIndex, 1)
      }
    },
    SET_STUDENTS(state, payload) {
      Object.assign(state.attendance, { students: parseInt(payload) })
    },
    SET_TEACHERS(state, payload) {
      Object.assign(state.attendance, { teachers: parseInt(payload) })
    },
    SET_PARENTS(state, payload) {
      Object.assign(state.attendance, { parents: parseInt(payload) })
    },
    SET_DATE(state, payload) {
      Object.assign(state, { date: payload })
    }
  },
  actions: {
    
  },
  getters: {
    seats: state => state.parents + state.teachers + state.students,
  }
}