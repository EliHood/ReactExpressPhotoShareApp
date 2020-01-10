import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm/LoginForm';
import IsAuth from '../isAuthenticatedHoc';
function Login(props){
  const didMountRef = useRef()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  useEffect( () => {
    if(! didMountRef.current) {
      didMountRef.current = true
      props.initLogin();
    }else{
      // console.log('this is component didupdate')
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const creds = {
      username,
      password,
    };
    console.log(creds)
    props.loginUser(creds);
  }
    return (
        <div>
          <Grid container justify="center" spacing={0}>
            <Grid item sm={10} md={6} lg={4} style={{ margin: '20px 0px' }}>
              <Typography variant="h4" style={{ letterSpacing: '2px' }}>
                     Sign In
              </Typography>
              {props.auth.errors ? (
                  <div  style={{ color: 'red', margin: '20px 0px'}}>
                    {props.auth.errors }
                  </div>
              ) : (
                null
              )}
              <LoginForm
                mySubmit={handleSubmit}
                passwordChange={e => setPassword(e.target.value )}
                usernameChange={e => setUsername(e.target.value)}
                username={username}
                password={password}
              />
             </Grid>
          </Grid>
        </div>
      );
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};
export default IsAuth(Login);
