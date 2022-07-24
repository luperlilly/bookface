import axios from 'axios'
import cookie from 'js-cookie'

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
})

// This isn't actually being used as the server is just looking for the access_token
// cookie directly. Another approach would indeed be to submit an Authorization
// header. Probably just choose one and get rid of everything about the other!
API.interceptors.request.use((req) => {
  const accessToken = cookie.get('access_token')

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req
})

export { API }
