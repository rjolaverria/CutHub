import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHORIZED,
  NOT_AUTHORIZED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from '../utils/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case AUTHORIZED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: data.user
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', data.token);
      return {
        ...state,
        ...data,
        isAuthenticated: true,
        loading: false,
        user: data.user
      };
    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case NOT_AUTHORIZED:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
