import axios from 'axios'

const instance = axios.create({
    timeout: 6000
});

export default instance;