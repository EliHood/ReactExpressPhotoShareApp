import {
  put, fork, takeLatest, call,
} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import api from '../api';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOG_OUT,
  LOGIN_USER,
  GET_CURRENT_USER,
  REGISTER_USER,
} from '../types'
import {
  userLogInSuccess,
  registerUserFailure,
  userLogOutFailure,
  currentUserSuccess,
  currentUserError,
  userLogOutSuccess,
  userLogInFailure,
  registerUserSuccess,
} from '../actions/authActions';

export function* userLogin(action) {
  try {
    // console.log(api.user.loginUser);
    // action.userData must be equvilent to the action function LOGIN_USER.
    const user = yield call(api.user.loginUser, action.userData);
    const { token } = user;
    console.log(token);
    // pass the token in session
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    // pass the decoded token
    // dispatch(setCurrentUser(decoded))
    // yield put(userLogInSuccess(user));
    yield put(userLogInSuccess(decoded));
  } catch (error) {
    yield put(userLogInFailure(error.response.data));
  }
}

export function* registerUser(action) {
  try {
    const user = yield call(api.user.registerUser, action.userData);
    console.log(user);
    const { token } = user;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decoded = jwtDecode(token);

    yield put(registerUserSuccess(decoded));
  } catch (error) {
    yield put(registerUserFailure(error));
  }
}
export function* userLogout(action) {
  try {
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // console.log(action);
    const logOut = yield call(api.user.logoutUser);
    yield put(userLogOutSuccess(logOut));
  } catch (error) {
    yield put(userLogOutFailure(error));
  }
}
export function* currentUser(action) {
  try {
    const user = yield call(api.user.getUser);
    yield put(currentUserSuccess(user));
  } catch (error) {
    yield put(currentUserError(error));
  }
}
export function* watchUserLogIn() {
  yield takeLatest(LOGIN_USER, userLogin);
}
export function* watchUserLogOut() {
  yield takeLatest(USER_LOG_OUT, userLogout);
}
export function* watchCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, currentUser);
}
export function* watchUserRegister() {
  yield takeLatest(REGISTER_USER, registerUser);
}
// export function*
export default function* () {
  yield fork(watchUserLogIn);
  yield fork(watchUserLogOut);
  yield fork(watchCurrentUser);
  yield fork(watchUserRegister);
}
