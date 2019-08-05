import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm/LoginForm';
import IsAuth from '../isAuthenticatedHoc';
// const onSuccess = response => console.log(response);
// const onFailure = response => console.error(response);
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: '',
        password: '',
        isAuthenticated: false,
      },
    };
  }
    handleChange = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      this.setState({
        formData: {
          ...formData,
          [e.target.name]: e.target.value,
        },
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      const { username, password } = formData;
      const creds = {
        username,
        password,
      };
      this.props.loginUser(creds);
      // console.log(creds);
    }

    render() {
      const googleLogin = (response) => {
        let googleData;
        googleData = {
          googleID: response.profileObj.googleId,
          email: response.profileObj.email,
          //   password: "",
        };
        console.log(googleData);
        this.props.googleLogin(googleData);
      };
      return (
        <div>
          <Grid container justify="center" spacing={0}>
            <Grid item sm={10} md={6} lg={4} style={{ margin: '20px 0px' }}>
              <Typography variant="h4" style={{ letterSpacing: '2px' }}>
                     Sign In
              </Typography>
              {this.props.auth.errors ? (
                this.props.auth.errors.map((err, i) => (
                  <div key={i} style={{ color: 'red' }}>
                    {err}
                  </div>
                ))
              ) : (
                null
              )}
              <LoginForm
                mySubmit={this.handleSubmit}
                myChange={this.handleChange}
                username={this.state.username}
                password={this.state.password}
              />
             </Grid>
          </Grid>
        </div>
      );
    }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};
export default IsAuth(Login);
