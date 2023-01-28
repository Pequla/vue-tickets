import axios from "axios";
import router from "@/router";

const client = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }, validateStatus: function (status) {
        return status === 200 || status === 204;
    }
});

function getToken() {
    return localStorage.getItem('token');
}

function handleError(err) {
    console.error(err);
    sessionStorage.setItem('error', err.name + ': ' + err.message)
    router.push('/action/error');
}

export default {
    login(email, password) {
        const data = {
            email: email,
            password: password
        }
        client.post('/user/login', data)
            .then(rsp => {
                localStorage.setItem('token', rsp.data.token);
                window.location.href = '/'
            })
            .catch(err => handleError(err))
    },
    signup(payload) {
        return client.post('/user', payload)
            .then(rsp => {
                console.log(rsp.data)
                router.push('/action/login')
            })
            .catch(err => handleError(err))
    },
    verifyEmail(token) {
        client.put('/user/verify/' + token)
            .catch(err => handleError(err))
    },
    getSelfUser() {
        return client.get('/user/self', {params: {token: getToken()}})
    },
    updateProfile(payload) {
        client.put('/user?token=' + getToken(), payload)
            .then(rsp => window.location.reload())
            .catch(err => handleError(err))
    },
    createTicket(payload) {
        client.post('/ticket?token=' + getToken(), payload)
            .then(rsp => {
                router.push('/user/ticket/' + rsp.data.id);
            })
            .catch(err => handleError(err))
    },
    getTicketById(id) {
        const pro = client.get('/ticket/' + id + '?token=' + getToken())
        pro.catch(err => handleError(err))
        return pro
    },
    deleteTicket(id) {
        client.delete('/ticket/' + id + '?token=' + getToken())
            .then(rsp=> router.push('/user/ticket'))
            .catch(err => handleError(err))
    },
    getTickets() {
        return client.get('/ticket?token=' + getToken())
    },
    getUsedTickets() {
        return client.get('/ticket/used?token=' + getToken())
    },
    changePassword(payload) {
        client.put('/user/password?token=' + getToken(), payload)
            .then(rsp => router.push('/'))
            .catch(err => handleError(err))
    }
}