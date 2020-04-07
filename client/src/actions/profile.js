import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_REPOS
} from '../utils/constants';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      data: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get profile by User ID
export const getProfilebyID = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/users/${userId}`);

    dispatch({
      type: GET_PROFILE,
      data: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get all user profiles
export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile/');

    dispatch({
      type: GET_ALL_PROFILES,
      data: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get User Github repos
export const getGithub = username => async dispatch => {
  if (username) {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({
        type: GET_REPOS,
        data: res.data
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        data: { msg: error.response.statusText, status: error.response.status }
      });
    }
  }
};

//Create or Edit Profile
export const setProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      data: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add Experience
export const addExp = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add Education
export const addEdu = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Experience
export const deleteExp = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data
    });
    dispatch(setAlert('Experience deleted', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Education
export const deleteEdu = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      data: res.data
    });
    dispatch(setAlert('Education deleted', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      data: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can't be undone")) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        data: { msg: error.response.statusText, status: error.response.status }
      });
    }
  }
};
