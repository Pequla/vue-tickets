import axios from "axios";
import router from "@/router";

const client = axios.create({
    baseURL: 'http://localhost:9090/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }, validateStatus: function (status) {
        return status === 200;
    }
});

function getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/action/login')
        throw new Error("No token set")
    }

    return token;
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
    }
}