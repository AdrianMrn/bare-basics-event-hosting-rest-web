import axios from 'axios';

export function getTest() {
    axios.get('http://localhost:8000/api/test')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
