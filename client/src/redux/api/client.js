import axios from 'axios'

const API = axios.create({
  baseURL: "https://bookface-appy.herokuapp.com/api",
  withCredentials: true,
})

export { API }
