Vue.config.devtools = true

Vue.component('flatpickr', VueFlatpickr)
Vue.use(SemanticUIVue)

// Moment date formats used in the app
const dateFormat = {
  long : "YYYY-MM-DD HH:mm:ss",
  short: "HH:mm A"
}

// Available show times
const times = [
  { hour: 9 , minute: 30 },
  { hour: 10, minute: 30 },
  { hour: 11, minute: 30 },
  { hour: 12, minute: 30 },
  { hour: 13, minute: 30 }
]

var app = new Vue({
  el: "#app",
  // data
  data() {
    return {
      attendance: {
        students: 20,
        teachers: 0,
        parents : 0,
        capacity: 180,
      },
      event: {
        date : null,
        shows: null, // number of shows the group will watch
        firstShow: null,
        secondShow: null,
        firstShowTime: null,
        secondShowTime: null,
        postShow: null,
      },
      teacher: {
        firstname: null,
        lastname: null,
        email: null,
        phone: [],
      },
      school: {
        id: null,
        name: null,
        address: null,
        city: null,
        state: "Texas",
        zip: null,
        phone: [],
        specialNeeds: null,
        taxable: null,
      },
      memo: null,
      // Events that come from the calendar
      events: [],
      // Available shows from the database
      shows: [],
      // Available Organizations
      organizations: [],
      isLoadingEvents: false,
      fetchFailed: false,
      // Form errors
      errors: [],
      // is reservation succesfull?
      isSuccess: false,
      // Flatpickr configuration
      config: {
        dateFormat: "l, F j, Y",
        minDate   : "today",
        inline    : true,
      }
    }
  },
  // Created
  created() {
    this.queryShows()
    this.queryOrganizations();
  },
  // Methods
  methods: {
    // Getting events, available and unavailable from the server
    queryEvents() {
      this.isLoadingEvents = true
      let date     = moment(this.event.date, "dddd, MMMM DD, YYYY").format("YYYY-MM-DD")
      let seats    = this.totalAttendance

      axios
        .get(`${SERVER}/api/public/findAvailableEvents?date=${date}&seats=${seats}`)
        .then(response => this.events          = response.data.data )
        .catch(error   => this.fetchFailed     = true )
        .finally(()    => this.isLoadingEvents = false )
    },
    // Getting list of shows from the server
    queryShows() {
      axios
        .get(`${SERVER}/api/public/shows`)
        .then(response => this.shows = response.data.data)
        .catch(error => this.fetchFailed = true)
    },
    // Getting list of schools from the server
    queryOrganizations() {
      axios
        .get(`${SERVER}/api/public/organizations`)
        .then(response => this.organizations = response.data.data)
        .catch(error => this.fetchFailed = true)
    },
    // Highlight card with amount of shows
    highlightCard(n) {
      this.event.shows = parseInt(n)
    },
    // submit data to server
    submit() {
      let secondShow = null
        if (this.event.secondShow == null)
          secondShow = ""
        else
          secondShow = Number(this.event.secondShow.id)

      let request = {
        // School Info
        schoolId: Number(this.school.id),
        school  : this.school.name,
        address : this.school.address,
        city    : this.school.city,
        state   : this.school.state,
        zip     : this.school.zip,
        phone   : `(${this.school.phone[0]}) ${this.school.phone[1]}-${this.school.phone[2]}`,
        // Teacher Info
        firstname: this.teacher.firstname,
        lastname : this.teacher.lastname,
        email    : this.teacher.email,
        cell     : `(${this.teacher.phone[0]}) ${this.teacher.phone[1]}-${this.teacher.phone[2]}`,
        // Event Info
        firstShowTime : this.event.firstShowTime,
        secondShowTime: this.event.secondShowTime,
        firstShow     : Number(this.event.firstShow.id),
        secondShow    : secondShow,
        postShow      : this.event.postShow,
        // Attendance
        students: Number(this.attendance.students),
        teachers: Number(this.attendance.teachers),
        parents : Number(this.attendance.parents),
        taxable : this.school.taxable,
        memo    : this.memo,
      }
      // console.log(request)
      // Send it to the server
      /*$.ajax({
        method : "POST",
        url    : "${SERVER}/api/public/createReservation",
        data   : request,
        success: function(response) { alert(response.message.content); this.isSuccess = true },
        error  : function() { alert("Failed to send reservation. Please try again in a few minutes.")}
      })*/
      axios({
          method: "POST",
          data: request,
          headers: {"content-type" : "application/json"},
          url: `${SERVER}/api/public/createReservation`,
        })
        //.post("${SERVER}/api/public/createReservation", request)
        .then(response => this.isSuccess = true)
        .catch(error => { alert("Unable to send reservation at this moment. Please try again in a few minutes.") })
    },
  },
  // Computed Properties
  computed: {
    // Calculates total attendance
    totalAttendance() {
      let students = parseInt(this.attendance.students)
      let teachers = parseInt(this.attendance.teachers)
      let parents  = parseInt(this.attendance.parents)

      return students + teachers + parents
    },
    // Filtering Events
    filteredEvents() {
    	let date = this.event.date
      date     = moment(date, "dddd, MMMM DD, YYYY")

      // Create a schedule of available shows for every possible show time
      let mockEvents = times.map(time => ({
        title     : "Available",
        start     : date.set(time).format(dateFormat.long),
        end       : date.set(time).add(1, "hour").format(dateFormat.long),
        isSelected: false,
      }))

      // Get taken shows from backend
      let scheduledEvents = this.events

      // Will hold schedule of events available and unavailable (if there are any)
      let filteredSchedule = [];

      // If there's a date set
    	if (this.event.date != null)
      {

				mockEvents.forEach(mockEvent => {
        	let isTaken = false
        	scheduledEvents.forEach(scheduledEvent => {
          	if (scheduledEvent.start == mockEvent.start) {
            	isTaken = true
            	filteredSchedule.push(scheduledEvent)
            }
          })
          if (!isTaken)
          	filteredSchedule.push(mockEvent)
        })
      }

      return filteredSchedule
    },
    // showTimeOptions
    showTimeOptions() {
      // take out shows marked as "Not Available" and format output for sui-dropdown
      let availableTimes = this.filteredEvents
                            .filter(availableTime => availableTime.title == "Available")
                            .map((availableTime, index) => ({ text: moment(availableTime.start, dateFormat.long).format(dateFormat.short),
                              value: moment(availableTime.start, dateFormat.long).format(dateFormat.long),
                              key: index,
                            }))

      return availableTimes
    },
    // filterShows
    //*** CHANGE BACKEND CODE TO TAKE SHOW ID **//
    filteredShows() {
      let shows = this.shows.map(show => ({
        key: show.id,
        text: show.name,
        value: show,
      }))
      return shows
    },
    // filterOrganizations
    filteredOrganizations() {
      let organizations = this.organizations.map(organization => ({
        key: organization.id,
        text: `${organization.name} (${organization.type})`,
        value: organization.id,
      }))
      // Add option for user to enter their a new organization
      organizations.push({
        key: 0,
        text: "My school is not on this list",
        value: 0,
      })
      return organizations
    },
    getShow(id) {
      let show = this.shows.filter(show => show.id == 1)
      return show
    },
    isFormValid() {
      if (
          (!this.teacher.firstname)   ||
          (!this.teacher.lastname)    ||
          (!this.teacher.email)       ||
          (!this.teacher.phone[0])    ||
          (!this.teacher.phone[1])    ||
          (!this.teacher.phone[2])    ||
          //(!this.school.name)       ||
          //(!this.school.address)    ||
          //(!this.school.city)       ||
          //(!this.school.zip)        ||
          //(!this.school.phone[0])   ||
          //(!this.school.phone[1])   ||
          //(!this.school.phone[2])   ||
          (!this.school.specialNeeds) ||
          (!this.school.taxable)
        )
        return false
      else
        return true
    }
  },
  // Filtered Properties
  filters: {

  },
})
