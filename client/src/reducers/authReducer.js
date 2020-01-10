import {
  USER_LOG_OUT,
  CURRENT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILURE,
  USER_LOG_IN_FAILURE,
  USER_LOG_IN_SUCCESS,
  INIT_LOGIN,
} from '../types';
import produce from 'immer';
import isEmpty from '../utils/isEmpty';
import { REHYDRATE}from 'redux-persist'
const initialState = {
  isAuthenticated: false,
  errors: null,
};

const authReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case USER_LOG_IN_FAILURE:
        draft.errors = action.error
        return 
      case USER_LOG_IN_SUCCESS:
        console.log(action)
        draft.isAuthenticated = !isEmpty(action.token)
        draft.user = action.token
        return
      case INIT_LOGIN:
        draft.errors = null
        return;
      case REHYDRATE:
        console.log(action.payload)
        draft.user = null
        draft.errors = null
        return
      case USER_LOG_OUT:
        draft.errors = action.error 
        return 
      case REGISTER_USER_SUCCESS:
        draft.isAuthenticated = !isEmpty(action.data)
        draft.user = action.data
        return
      case REGISTER_USER_FAILURE:
        draft.isAuthenticated = false
        return
      case USER_LOG_OUT_SUCCESS:
        console.log(action.payload)
        draft.isAuthenticated = false
        return
      case USER_LOG_OUT_FAILURE:
        draft.error = action.error
        return
      case CURRENT_USER_SUCCESS:
        draft.current_user = action.data
        draft.isAuthenticated = !isEmpty(action.data)
        return 
    }
    
});

export default authReducer;
