import { API } from './client'

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`)
export const likePost = (id, userId) => API.put(`/posts/${id}/like`, { userId: userId })
export const deletePost = (id) => API.delete(`/posts/${id}`)
