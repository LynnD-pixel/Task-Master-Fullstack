import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL
//console.log(BASE_URL)

//gets token from localstorage
export const token = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return user?.token;
}

//users API
export const userClient = axios.create({
    baseURL: BASE_URL + '/api/users',
});

//projects API
export const projectClient = axios.create({
    baseURL: `${BASE_URL}/api/projects`,
});

//attach token dynamically
[userClient, projectClient].forEach((client) => {
    client.interceptors.request.use((req) => {
        const t = token();
        if (t) {
            req.headers.Authorization = `Bearer ${t}`
        }
        return req;
    });
});