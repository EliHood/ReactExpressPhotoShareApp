import Axios from '../Axios';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS, GET_CURRENT_USER} from './types';
import setAuthToken from './utils/setAuthToken';

export const loginUser = userData => dispatch => {
    Axios.post('/users/login', userData)
        .then( res => {
            // retrieve token from the response 
            const token = res.data.token;
            // console.log(token);
            // pass the token in session
            sessionStorage.setItem("jwtToken", token);
            // set the auth token
            setAuthToken(token);
            
            // decode the auth token
            const decoded = jwt_decode(token);
            // pass the decoded token
            dispatch(setCurrentUser(decoded))
         
        })
        .catch(err => {
            if(err.response.data){
                console.log(err.response)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        })
}
export const getUser = () => {
    return (dispatch) => {
        return Axios.get('/users/current_user',{
        }).then( res => {
            const data = res.data
            dispatch({type: GET_CURRENT_USER, data})
        })
    }
}
export const registerUser = (userData) => dispatch => {
    Axios
      .post('/users/register', userData)
      .then( res => {
        const token = res.data.token;
        // console.log(token);
        // pass the token in session
        sessionStorage.setItem("jwtToken", token);
        // set the auth token
        setAuthToken(token);
        // decode the auth token
        const decoded = jwt_decode(token);
        // pass the decoded token
        dispatch(setCurrentUser(decoded)) 
 
      }).catch( err => {
        //  console.log(err.response.data.error[0].msg)
        Object.keys(err.response.data.error).forEach( (key) => {
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data.error[key].msg
            }) 
        })
    })    
};
// google login 
export const googleLogin = (userData) => dispatch => {
    Axios
      .post('/users/auth/google', userData, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then(res => {
        const { token } = res.data;
        console.log(token);
        // Set token to ls
        sessionStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => console.log(err));
  };
// set logged in user 
export const setCurrentUser = (decoded, dispatch) => {
    return{
        type:SET_CURRENT_USER,
        payload:decoded,
        
    }
    
}
export const logoutUser = () => dispatch => {
    // Remove token from sessionStorage
    sessionStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    Axios.get('/users/logout')
};