import React, { Component } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Navbar from './containers/navbar';
import {store, persistor} from './store';
import { userLogInSuccess, userLogOut, getUser } from './actions/authActions';
import { PersistGate } from 'redux-persist/integration/react'
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
    if (decoded.iat > currentTime) {
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
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
