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

            next(false);
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
            // TODO: find a way to get the user's details and set them in cookies (in the store as well? or let Root.js handle this?)
            /* cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name); */
            cookie.save('email', data.email);
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            next(false);
        })
        .catch(error => {
            next(error);
        });
}

export function getUserEvents(next) {
    setAccessToken();
    axios.get(`${apiUrl}/getuserevents`)
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
    axios.get(`${apiUrl}/getsessionspeakers/${sessionId}`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}

export function createNewSession(eventId, next) {
    setAccessToken();
    axios.post(`${apiUrl}/sessions?eventId=${eventId}`)
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

/* export function getUserInfo(next) {
    setAccessToken();
    axios.get(`${apiUrl}/getuserprofile`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
} */
