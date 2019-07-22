import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const SignUpForm = ({
  signSubmit, myChange, username, password, email,
  passErr,password_error_text,
  passwordConf_error_text,
  passwordConfpassErr, passwordConf,
  validation
}) => (
  <form onSubmit={signSubmit}>
    <TextField
      label="Username"
      style={{ width: '100%' }}
      name="username"
      value={username}
      onChange={myChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Email"
      className=""
      style={{ width: '100%' }}
      name="email"
      value={email}
      onChange={myChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Password"
      name="password"
      type="password"
      helperText={password_error_text}
      style={{ width: '100%' }}
      error={passErr}
      className=""
      value={password}
      onChange={myChange}
      margin="normal"
    />
    {/*  */}
    <br />
    <TextField
      label="Confirm Password"
      name="passwordConf"
      type="password"
      helperText={passwordConf_error_text}
      error={passwordConfpassErr}
      style={{ width: '100%' }}
      className=""
      value={passwordConf}
      onChange={myChange}
      margin="normal"
    />
    <br />
    <br />

    <Button
      disabled={validation}
      variant="outlined"
      color="primary"
      type="submit"
    >
        Sign Up
    </Button>
  </form>
);

SignUpForm.propTypes = {
  signSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,
  usernameChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  handleEmail: PropTypes.func.isRequired,
  password_error_text: PropTypes.string,
  passErr: PropTypes.string,
  password: PropTypes.string,
  handlePassword: PropTypes.func.isRequired,
  passwordConf_error_text: PropTypes.string,
  passwordConfpassErr: PropTypes.string,
  passwordConf: PropTypes.string,
  handlePasswordConf: PropTypes.func.isRequired,
  validation: PropTypes.bool.isRequired,
};

export default SignUpForm;
