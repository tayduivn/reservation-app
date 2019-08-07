import addDays from 'date-fns/addDays'

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
    date: null,
    min_date: addDays(new Date(), 14),
    times: [],
    shows: [],
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
    },
    SET_TIMES(state, payload) {
      Object.assign(state, { times: payload })
    },
    SET_SHOWS(state, payload) {
      Object.assign(state, { shows: payload })
    }
  },
  actions: {
    
  },
  getters: {
    seats: state => state.attendance.parents + state.attendance.teachers + state.attendance.students,
  }
}