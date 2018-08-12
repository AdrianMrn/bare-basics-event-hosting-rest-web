import { createConnectedStore } from 'undux'

export default createConnectedStore({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  myEvents: [],

  selectedEvent: {
    id: 0,
    name: '',
    slug: '',
    address: '',
    city: '',
    country: '',
    venue_name: '',
    description: '',
    date_start: '',
    date_end: '',
    type: 0,
    is_private: false,
    is_published: false,
  },
  eventEdit: {
    name: '',
    address: '',
    city: '',
    country: '',
    venue_name: '',
    description: '',
    date_start: '',
    date_end: '',
    type: 0,
    is_private: false,
    is_published: false,
  },


  selectedEventSessions: [],
  sessionEdit: {
    id: 0,
    event_id: 0,
    name: '',
    description: '',
    type: 0,
    date_start: '',
    date_end: '',
  },

  selectedEventSpeakers: [],
  speakerEdit: {

  },

  selectedEventSponsors: [],

  sponsorEdit: {

  },

});