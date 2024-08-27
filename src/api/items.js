import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:5000'
    // baseURL:'http://192.168.10.5:5000'
})