import {
  USER_LOG_OUT,
  CURRENT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILURE,
  USER_LOG_IN_FAILURE,
  USER_LOG_IN_SUCCESS,
  GET_ERRORS,
  GET_CURRENT_USER,
  REGISTER_USER,
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
      case REHYDRATE:
        console.log(action.payload)
        draft.user = null
        return
      case GET_ERRORS:
        console.log(action.payload);
        // allows for us to loop through an array of errors.
        draft.errors = action.error
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
