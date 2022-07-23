import axios from 'axios'
import cookie from 'js-cookie'

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
})

API.interceptors.request.use((req) => {
  const accessToken = cookie.get('access_token')

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req
})

export { API }
