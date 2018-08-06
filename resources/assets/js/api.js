import axios from 'axios';
import cookie from 'react-cookies'

import { apiUrl } from './config';

export function registerAccount(data, next) {
    axios.post(`${apiUrl}user/register`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
    })
        .then(function (response) {
            // Saving the user's data to cookies
            cookie.save('email', data.email);
            cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name);
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);

            next(false);
        })
        .catch(function (error) {
            next(error);
        });
}

export function authenticateAccount(data, next) {
    axios.post(`${apiUrl}user/authenticate`, {
        email: data.email,
        password: data.password
    })
        .then(function (response) {
            console.log(response);
            // Saving the user's data to cookies
            /* cookie.save('email', data.email);
            cookie.save('firstName', data.first_name);
            cookie.save('lastName', data.last_name); */
            cookie.save('accessToken', response.data.access_token);
            cookie.save('refreshToken', response.data.refresh_token);
            
            next(false);
        })
        .catch(function (error) {
            next(error);
        });
}
