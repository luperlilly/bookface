import * as postApi from "../api/postRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETRIEVING_START" });

  try {
    const { data } = await postApi.getTimelinePosts(id);
    dispatch({ type: "RETRIEVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETRIEVING_FAIL" });
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: "DELETE_POST", data: postId });
  postApi.deletePost(postId)
};
