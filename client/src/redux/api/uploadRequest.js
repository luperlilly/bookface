import { API } from './client'

export const uploadImage = (data) => API.post('/upload', data)

export const uploadPost = (data) => API.post("/posts", data)
