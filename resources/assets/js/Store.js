import { createConnectedStore } from 'undux'

export default createConnectedStore({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  myEvents: [],

  errorModal: {
    showErrorModal: false,
    errorMessages: [],
    alertStyle: '',
  },

  user: {
    email: '',
    first_name: '',
    last_name: '',
    company: '',
    position: '',
    description: '',
    linkedin: '',
    facebook: '',
    website: '',
    twitter: '',
  },

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
    coords_lon: 0,
    coords_lat: 0,
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
    image: '',
    coords_lon: 0,
    coords_lat: 0,
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
  sessionSpeakersEdit: [], // List of speaker id's that will speak at this session

  selectedEventSpeakers: [],
  speakerEdit: {
    email: ''
  },

  selectedEventSponsors: [],

  sponsorEdit: {
    name: '',
    description: '',
    url: '',
    tier: '',
    event_id: ''
  },

});
