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
    show_data: [],
    selected_shows: [],
    post_show: null,
    organization: null,
    new_organization: {
      name         : '',
      address      : '',
      city         : '',
      state        : 'Texas',
      zip          : '',
      phone        : '',
    },
    teacher: {
      first_name: '',
      last_name : '',
      email     : '',
      phone     : '',
    },
    special_needs: false,
    tax_exempt   : false,
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
    },
    SET_POST_SHOW(state, payload) {
      Object.assign(state, { post_show: payload })
    },
    SET_SELECTED_SHOWS(state, payload) {
      Object.assign(state, { selected_shows: payload })
    },
    SET_ORGANIZATION(state, payload) {
      Object.assign(state, { organization: payload })
    },
    SET_NEW_ORGANIZATION(state, payload) {
      Object.assign(state, { new_organization: payload })
    },
    SET_TEACHER(state, payload) {
      Object.assign(state, { teacher: payload })
    },
    SET_SHOW_DATA(state, payload) {
      state.show_data.splice(0, payload.index, payload.show)
    }
  },
  actions: {
    
  },
  getters: {
    seats: state => state.attendance.parents + state.attendance.teachers + state.attendance.students,
  }
}