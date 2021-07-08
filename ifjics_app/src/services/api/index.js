import axios from 'axios';

import constants from './constants';

const api = axios.create({

    // baseURL: 'http://192.168.1.12:8080/api/v1/',
    baseURL: 'https://demo-ifjics-api.herokuapp.com/api/v1/',

});

export default api;