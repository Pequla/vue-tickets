import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.pequla.com/here',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    geocode(query) {
        query = query.split(' ')[0]
        return client.get('/geocode?q=' + query)
    }
}