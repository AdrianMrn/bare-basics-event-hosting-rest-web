import axios from 'axios';
import cookie from 'react-cookies';

import { apiUrl } from './config';

export function registerAccount(data, next) {
    axios.post(`${apiUrl}user/register`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
    })
        .then(response => {
            // Saving the user's data to cookies
            cookie.save('email', data.email);
            cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name);
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            next(false);
        })
        .catch(error => {
            next(error);
        });
}

export function authenticateAccount(data, next) {
    axios.post(`${apiUrl}user/authenticate`, {
        email: data.email,
        password: data.password
    })
        .then(response => {
            // Saving the user's data to cookies
            // TODO: find a way to get the user's details and set them in cookies (in the store as well? or let Root.js handle this?)
            /* cookie.save('email', data.email);
            cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name); */
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            next(false);
        })
        .catch(error => {
            next(error);
        });
}

export function getUserEvents(next) {
    axios.get(`${apiUrl}getuserevents`)
        .then(response => {
            next(false, response);
        })
        .catch(error => {
            next(error);
        });
}
