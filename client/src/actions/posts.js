import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_LIKES,
  POST_ERROR,
  DELETE_POST,
  CLEAR_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../utils/constants';

//Get all Posts
export const getAllPosts = () => async dispatch => {
  dispatch({ type: CLEAR_POST });
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_ALL_POSTS,
      data: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get A Post by ID
export const getPost = postId => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      data: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Create Post
export const createPost = text => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', text, config);

    dispatch({
      type: CREATE_POST,
      data: res.data
    });
    dispatch(setAlert('Post created', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Like Post
export const likePost = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      data: { postId, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Unlike Post
export const unlikePost = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      data: { postId, like: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      data: postId
    });
    dispatch(setAlert('Post Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Add Comment
export const addComment = (postId, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/posts/${postId}/comments`, text, config);

    dispatch({
      type: ADD_COMMENT,
      data: res.data
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}/comments/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      data: commentId
    });
    dispatch(setAlert('Comment deleted', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
