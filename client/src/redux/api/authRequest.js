import { API } from './client'

export const signUp = (formData) => API.post('/auth/register', formData)

export const logIn = (formData) => API.post('/auth/login', formData)
