import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:8000/api" })

export const getUser = (userId) => API.get(`/users/${userId}`)

export const getAllUsers = () => API.get('/users')

export const updateUser = (id, formData) => API.put(`/users/${id}`, formData)

export const followUser = (id, data) => API.put(`/users/${id}/follow`, data)

export const unfollowUser = (id, data) => API.put(`/users/${id}/unfollow`, data)