import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../utils/constants';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: data,
        loading: false
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: data,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: data,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
