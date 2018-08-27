import axios from 'axios';
import cookie from 'react-cookies';

import { apiUrl } from './config';

export function setAccessToken() {
    const accesToken = cookie.load('accessToken');
    if (accesToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accesToken}`;
    }
}

export function registerAccount(data, next) {
    axios.post(`${apiUrl}/user/register`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
    })
        .then(response => {
            // Saving the user's data to cookies
            cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name);
            cookie.save('email', data.email);
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            next(false, data);
        })
        .catch(error => {
            next(error);
        });
}

export function authenticateAccount(data, next) {
    axios.post(`${apiUrl}/user/authenticate`, {
        email: data.email,
        password: data.password
    })
        .then(response => {
            // Saving the user's data to cookies
            cookie.save('email', data.email);
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            getMyProfile((error, response) => {
                if (error) {
                    console.log(error);
                } else {
                    cookie.save('firstName', response.data.first_name);
                    cookie.save('lastName', response.data.last_name);
                    next(false, response.data);
                }
            })

        })
        .catch(error => {
            next(error);
        });
}

export function getMyProfile(next) {
    setAccessToken();
    axios.get(`${apiUrl}/get-my-profile`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function getUserEvents(next) {
    setAccessToken();
    axios.get(`${apiUrl}/get-user-events`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function createNewEvent(next) {
    setAccessToken();
    axios.post(`${apiUrl}/events`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function saveEventGeneralInfo(eventId, postData, next) {
    setAccessToken();
    axios.put(`${apiUrl}/events/${eventId}`, postData)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function getEventData(id, next) {
    setAccessToken();
    axios.get(`${apiUrl}/events/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function getEventExtraDetails(type, eventId, next) {
    setAccessToken();
    axios.get(`${apiUrl}/eventinfo/${type}/${eventId}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function getSessionSpeakers(sessionId, next) {
    setAccessToken();
    axios.get(`${apiUrl}/get-session-speakers/${sessionId}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function createNewSession(eventId, next) {
    setAccessToken();
    axios.post(`${apiUrl}/sessions`, { eventId })
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function deleteSession(id, next) {
    setAccessToken();
    axios.delete(`${apiUrl}/sessions/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function deleteEvent(id, next) {
    setAccessToken();
    axios.delete(`${apiUrl}/events/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function updateSession(id, postData, next) {
    setAccessToken();
    axios.put(`${apiUrl}/sessions/${id}`, postData)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function updateSessionSpeakers(id, postData, next) {
    setAccessToken();
    axios.post(`${apiUrl}/set-session-speakers/${id}`, postData)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function createNewSpeaker(postData, next) {
    setAccessToken();
    axios.post(`${apiUrl}/speakers`, postData)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function getSpeakerInfo(id, next) {
    setAccessToken();
    axios.get(`${apiUrl}/speakers/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function deleteSpeaker(id, next) {
    setAccessToken();
    axios.delete(`${apiUrl}/speakers/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function uploadImage(image, eventId, next) {
    setAccessToken();
    const formData = new FormData();
    formData.append("image", image);

    axios.post(`${apiUrl}/events/link-image/${eventId}`,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function createNewSponsor(eventId, next) {
    setAccessToken();
    axios.post(`${apiUrl}/sponsors`, { eventId })
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function updateSponsor(id, postData, next) {
    setAccessToken();
    axios.put(`${apiUrl}/sponsors/${id}`, postData)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function deleteSponsor(sponsorId, next) {
    setAccessToken();
    axios.delete(`${apiUrl}/sponsors/${id}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

/* export function getUserInfo(next) {
    setAccessToken();
    axios.get(`${apiUrl}/get-user-profile`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
} */
