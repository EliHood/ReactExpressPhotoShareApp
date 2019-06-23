import React, { Component } from 'react';
import './App.css';
import setAuthToken from "./actions/utils/setAuthToken";
import Navbar from './layout/Navbar';
import jwt_decode from "jwt-decode";
import store from './store';
import {setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from "react-redux";
// JWT TOKEN
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render(){
    return (
      <Provider store={store}>
         <Navbar/>
      </Provider>
    );
  }
}
export default App;
