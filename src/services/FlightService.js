import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getFlights(page = 0, size = 12) {
        return client.get('/flight', {
            params: {
                page: page,
                size: size,
                sort: 'scheduledAt,asc'
            }
        })
    },
    getFlightById(id) {
        return client.get('/flight/' + id)
    },
    getDestinations() {
        return client.get('/flight/destination')
    },
    getFlightsByDestination(destination, page = 0, size = 12) {
        return client.get('/flight/destination/' + destination, {
            params: {
                page: page,
                size: size,
                sort: 'scheduledAt,asc'
            }
        })
    },
    searchDestinations(input) {
        return client.get('/flight/destination/search/' + input)
    }
}