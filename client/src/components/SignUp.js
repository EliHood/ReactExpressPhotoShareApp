import React, { Component, useState, useEffect, useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SignUpForm from './SignUpForm/SignUpForm';
import IsAuth from '../isAuthenticatedHoc';
function SignUp(props) {
  const didMountRef = useRef()
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [password_error_text, setPasswordErrorText] = useState('');
  const [passErr, setPassErr] = useState(null);
  const [passwordConf_error_text, setPasswordConfErrorText] = useState('')
  const [passwordConfpassErr, setPasswordConfPassErr] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username,email, password, passwordConf)
    const creds = {
      username,
      email,
      password,
    };
    console.log(creds);
    if (password === passwordConf) {
      props.registerUser(creds, props.history);
    } else {
      setPassErr('Passwords dont match')
    }
  }
  useEffect( () => {
    if(! didMountRef.current) {
      didMountRef.current = true
      console.log('this gets called once')
    }
    else{
      console.log('test')
      if (password.length !== password.length) {
        if (password.length <= 6) {
          setPassErr(true)
          setPasswordErrorText('Password must be at least 6 Chars')
          console.log(password_error_text);
        } else {
          setPassErr(false)
          setPasswordErrorText('')
        }
      }
    }
  })
  const validation = {
        validation: !email || !username || !password|| !passwordConf|| password.length <= 6 || passwordConf.length <= 6,
    };
      return (
        <div>
          <Grid container justify="center" spacing={0}>
            <Grid item sm={10} md={6} lg={4} style={{ margin: '20px 0px' }}>
              <Typography variant="h4" style={{ letterSpacing: '2px' }}>
                  Sign Up
              </Typography>
              {passErr && (
                <div style={{ color: 'red' }}>
                  {passErr}
                </div>
              )}
              <SignUpForm
                signSubmit={handleSubmit}
                username={username}
                handleEmailChange={e => setEmail(e.target.value)}
                handleUsernameChange={e => setUsername(e.target.value)}
                handlePasswordChange={e => setPassword(e.target.value)}
                handlePaswordConf={e => setPasswordConf(e.target.value)}
                email={email}
                password_error_text={password_error_text}
                passErr={passErr}
                password={password}
                passwordConf_error_text={passwordConf_error_text}
                passwordConfpassErr={passwordConfpassErr}
                passwordConf={passwordConf}
                validation={validation.validation}
              />
            </Grid>
          </Grid>
        </div>
      );
}
SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
export default IsAuth(SignUp);
