import { createConnectedStore } from 'undux'

export default createConnectedStore({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  myEvents: '',

  selectedEvent: {
    id: undefined,
    name: undefined,
    slug: undefined,
    address: undefined,
    city: undefined,
    country: undefined,
    venue_name: undefined,
    description: undefined,
    date_start: undefined,
    date_end: undefined,
    type: undefined,
    is_private: undefined,
    is_published: undefined,
  }

  /* 
    eventEdit: {
      name: undefined,
      address: undefined,
      city: undefined,
      country: undefined,
      venue_name: undefined,
      description: undefined,
      date_start: undefined,
      date_end: undefined,
      type: undefined,
      is_private: undefined,
      is_published: undefined,
    }

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
