import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:8000/api", withCredentials: true })

export const signUp = (formData) => API.post('/auth/register', formData)

export const logIn = (formData) => API.post('/auth/login', formData)
