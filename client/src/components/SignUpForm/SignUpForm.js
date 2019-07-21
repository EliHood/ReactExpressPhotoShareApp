import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const SignUpForm = props => (
  <form onSubmit={props.signSubmit}>
    <TextField
      label="Username"
      style={{ width: '100%' }}
      name="username"
      value={props.username}
      onChange={props.usernameChange}
      margin="normal"
    />
    <br />
    <TextField
      label="Email"
      className=""
      style={{ width: '100%' }}
      name="email"
      value={props.email}
      onChange={props.handleEmail}
      margin="normal"
    />
    <br />
    <TextField
      label="Password"
      name="password"
      type="password"
      helperText={props.password_error_text}
      style={{ width: '100%' }}
      error={props.passErr}
      className=""
      value={props.password}
      onChange={props.handlePassword}
      margin="normal"
    />
    {/*  */}
    <br />
    <TextField
      label="Confirm Password"
      name="passwordConf"
      type="password"
      helperText={props.passwordConf_error_text}
      error={props.passwordConfpassErr}
      style={{ width: '100%' }}
      className=""
      value={props.passwordConf}
      onChange={props.handlePasswordConf}
      margin="normal"
    />
    <br />
    <br />

    <Button
      disabled={props.validation}
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
