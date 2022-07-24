import * as userApi from "../api/userRequest"

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" })
  try {
    const { data } = await userApi.updateUser(id, formData)
    dispatch({ type: "UPDATING_SUCCESS", data: data })
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" })
  }
}

export const followUser = (id) => async (dispatch)=> {
  await userApi.followUser(id)
  dispatch({type: "FOLLOW_USER", data: id})
}

export const unfollowUser = (id) => async (dispatch)=> {
  await userApi.unfollowUser(id)
  dispatch({type: "UNFOLLOW_USER", data: id})
}