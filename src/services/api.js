import axios from "axios";

export const api = axios.create({
    baseURL: 'http://backend.test/api'
})

export const createSession = async (email, password) => {
    return api.post('/login', { email, password });
}

export const getUsers = async() => {
    return api.get("/listausuarios");
} 