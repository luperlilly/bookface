import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:8000/api" })

export const getUser = (userId) => API.get(`/users/${userId}`)

export const updateUser = (id, formData) => API.put(`/users/${id}`, formData)