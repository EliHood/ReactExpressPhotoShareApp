
import {
  GET_CURRENT_USER_ERROR,
  LOGIN_USER,
  USER_LOG_OUT,
  USER_LOG_OUT_FAILURE,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_IN_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  GET_ERRORS,
  INIT_LOGIN,
  GET_CURRENT_USER,
  USER_LOG_IN_SUCCESS,
  CURRENT_USER_SUCCESS,
} from '../types'

export const loginUser = userData => ({
  type: LOGIN_USER,
  userData,
});

// action needs to be equivlent to whatever is in the params for instance token,
// so in the reducer we refer to action.token.
export const userLogInSuccess = token => ({
  type: USER_LOG_IN_SUCCESS,
  token,
});

export const userLogInFailure = error => ({
  type: USER_LOG_IN_FAILURE,
  error,
});

export const userLogOut = () => ({
  type: USER_LOG_OUT,

});

export const userLogOutSuccess = logOut => ({
  type: USER_LOG_OUT_SUCCESS,
  logOut,
});

export const userLogOutFailure = error => ({
  type: USER_LOG_OUT_FAILURE,
  error,
});

export const getUser = data => ({
  type: GET_CURRENT_USER,
  data,
});

export const currentUserSuccess = data => ({
  type: CURRENT_USER_SUCCESS,
  data,
});

export const currentUserError = error => ({
  type: GET_CURRENT_USER_ERROR,
  error,
});
export const registerUserSuccess = data => ({
  type: REGISTER_USER_SUCCESS,
  data,
});
export const registerUserFailure = error => ({
  type: REGISTER_USER_FAILURE,
  error,
});
export const registerUser = userData => ({
  type: REGISTER_USER,
  userData,
});

export const initLogin = () => ({
  type: INIT_LOGIN,
})