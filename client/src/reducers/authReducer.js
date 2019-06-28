import { USER_LOG_OUT, CURRENT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, USER_LOG_OUT_SUCCESS, USER_LOG_OUT_FAILURE, USER_LOG_IN_FAILURE ,  USER_LOG_IN_SUCCESS,  GET_ERRORS, GET_CURRENT_USER, REGISTER_USER} from '../actions/types';
import isEmpty from '../actions/utils/isEmpty';
const initialState = {
    isAuthenticated: false,
    errors: []
}
export default  (state = initialState, action) => {
    switch (action.type) {
        case USER_LOG_IN_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                success: false,
                error: action.error
            }
        case USER_LOG_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.token),
                user:action.token,
                errors:[]
            }
        case GET_ERRORS:
            console.log(action.payload)
            // allows for us to loop through an array of errors.
            return{
            	errors: [action.payload]
            }  
        case USER_LOG_OUT:
            return {
                ...state,
                error: []
            };

        case REGISTER_USER:
            return {
                ...state
            }
        case REGISTER_USER_SUCCESS:
            console.log(action)
            return {
                ...state,
                isAuthenticated: !isEmpty(action.data),
                user:action.data,
                errors:[]
            }
        case  REGISTER_USER_FAILURE:
            return{
                ...state,
                isAuthenticated:false
            }
        case USER_LOG_OUT_SUCCESS:
            return {
                ...state,
                data: [],
                error: []
            };
        case USER_LOG_OUT_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                success: false,
                error: action.error
            }
        case GET_CURRENT_USER:
            return{
                ...state,
                current_user:action.data
            }
        case CURRENT_USER_SUCCESS:
            // console.log(action.data);
            return{
                ...state,
                current_user:action.data
            }
        default:
            return state;
    }
}
