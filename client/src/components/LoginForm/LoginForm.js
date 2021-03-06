import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const LoginForm = ({
  mySubmit,username, password, passwordChange, usernameChange
}) => (
  <form onSubmit={mySubmit}>
    <TextField
      label="Username"
      fullWidth
      style={{ borderRadius: 25 }}
      name="username"
      value={username}
      onChange={usernameChange}
      margin="normal"
    />
    <TextField
      label="Password"
      name="password"
      type="password"
      fullWidth
      style={{ borderRadius: '0px' }}
      className=""
      value={password}
      onChange={passwordChange}
      margin="normal"
    />
    <br />
    <br />
    <Button variant="outlined" color="primary" type="submit">
      Log In
    </Button>
  </form>

);

LoginForm.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  myChange: PropTypes.func.isRequired,
  mySubmit: PropTypes.func.isRequired,
};

export default LoginForm;
