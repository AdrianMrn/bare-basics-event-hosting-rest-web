import axios from 'axios';

export function getTest() {
    axios.post('http://localhost:8000/api/user/register', {
        first_name: 'Adri',
        last_name: 'dude',
        email: 'testuser123@gmail.com',
        password: 'kekkertop'
    })
        .then(function (response) {
            console.log(response);
            // TODO: save response.data.access_token in localstorage/cookie
        })
        .catch(function (error) {
            console.log(error);
        });
}
