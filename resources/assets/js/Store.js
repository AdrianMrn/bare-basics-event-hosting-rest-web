import { createConnectedStore } from 'undux'

export default createConnectedStore({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  myEvents: '',

  selectedEvent: {
    id: '',
    name: '',
    slug: '',
    address: '',
    city: '',
    country: '',
    venue_name: '',
    description: '',
    date_start: '',
    date_end: '',
    type: '',
    is_private: '',
    is_published: '',
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
    type: '',
    is_private: '',
    is_published: '',
  },
  /* 

    selectedEventSessions: {

    }

    sessionEdit: {

    }

    selectedEventSpeakers: {

    }

    speakerEdit: {

    }

    selectedEventSponsors: {

    }

    sponsorEdit: {

    }
  */
});
