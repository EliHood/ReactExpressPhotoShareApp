import React, { Component } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Navbar from './containers/navbar';
import store from './store';
import { userLogInSuccess, userLogOut, getUser } from './actions/authActions';




class App extends Component {
 UNSAFE_componentWillMount(){
    // JWT TOKEN
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp

    const token = localStorage.getItem('jwtToken');
    
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(userLogInSuccess(decoded));
    store.dispatch(getUser());
    // Check for expired token
    const currentTime = Date.now() / 1000;
    
    if (decoded.iat < currentTime) {
      // Logout user
      store.dispatch(userLogOut());
      // Redirect to login
      window.location.href = '/login';
    }

    
}

  }
  render() {
    return (
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  }
}
export default App;
