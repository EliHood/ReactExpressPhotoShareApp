import React, { Component } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './actions/utils/setAuthToken';
import Navbar from './containers/navbar';
import store from './store';
import { userLogInSuccess, userLogOut, getUser } from './actions/authActions';
// JWT TOKEN
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(userLogInSuccess(decoded));
  store.dispatch(getUser());
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(userLogOut());
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  }
}
export default App;
