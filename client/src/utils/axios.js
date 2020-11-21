import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://cut-hub.herokuapp.com/'
        : 'http://localhost:5000/';

export default axios.create({
    baseURL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});
