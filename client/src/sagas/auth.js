import { put, fork, takeLatest, call } from 'redux-saga/effects';
import api from '../api';
import setAuthToken from '../actions/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {  USER_LOG_OUT, LOGIN_USER,  GET_CURRENT_USER} from '../actions/types';
import {userLogInSuccess, userLogOutFailure,currentUserSuccess, currentUserError, userLogOutSuccess, userLogInFailure} from '../actions/authActions';
export function* userLogin(action){
    try{
        // console.log(api.user.loginUser);
        // action.userData must be equvilent to the action function LOGIN_USER. 
        const user = yield call(api.user.loginUser, action.userData);
        const token = user.token
        console.log(token);
        // pass the token in session
        sessionStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        // pass the decoded token
        // dispatch(setCurrentUser(decoded))
        // yield put(userLogInSuccess(user));
        yield put( userLogInSuccess(decoded))
    }
    catch(error){
        yield put(userLogInFailure(error.response.data));
    }
}
export function* userLogout(action){
    try{
        sessionStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);
        // console.log(action);
        const logOut = yield call(api.user.logoutUser);
        yield put(userLogOutSuccess(logOut));
    }
    catch(error){
        yield put(userLogOutFailure(error))
    }
}
export function* currentUser(action) {
    try{
        const user = yield call(api.user.getUser)
        console.log(user);
        yield put(currentUserSuccess(user))
    }
    catch(error){
        yield put(currentUserError(error))
    }
}
export function* watchUserLogIn() {
    yield takeLatest(LOGIN_USER, userLogin);
}
export function* watchUserLogOut() {
    yield takeLatest(USER_LOG_OUT,  userLogout);
}
export function* watchCurrentUser(){
    yield takeLatest(GET_CURRENT_USER, currentUser)
}
// export function* 
export default function* () {
    yield fork(watchUserLogIn);
    yield fork( watchUserLogOut);
    yield fork(watchCurrentUser)
}