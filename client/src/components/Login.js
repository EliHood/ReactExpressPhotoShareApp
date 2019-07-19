import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { loginUser, googleLogin } from '../actions/authActions';
import LoginForm from './LoginForm/LoginForm';
import { history } from '../layout/Navbar';
import ReduxContainer from '../reduxHOC';
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
      errors: {},
    };
  }

    logInGithub = (e) => {
      e.preventDefault();
      console.log('hello');
      this.props.githubLogin();
    }

    componentDidMount() {
      // console.log(this.props.auth);
      if (this.props.auth.isAuthenticated) {
        history.push('/dashboard');
      }
    }

    componentDidUpdate() {
      if (this.props.auth.isAuthenticated) {
        history.push('/dashboard');
      }
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
              <Grid item sm={12}>
                <Typography align="center" variant="h4" style={{ letterSpacing: '6px' }}>
                                OR
                </Typography>
                <Divider style={{ width: '200px', margin: '20px auto', backgroundColor: '#000000' }} variant="middle" />
              </Grid>
              <GoogleLogin
                clientId="414221829387-squf9po9h437tjkknkc0c4foq6734fo7.apps.googleusercontent.com"
                render={renderProps => (
                  <GoogleLoginButton
                    className="googleBtn"
                    alt="googleLogo"
                    onClick={renderProps.onClick}
                    align="center"
                    style={{ background: '#80cbc4' }}
                  />
                )}
                buttonText="Login with Google"
                onSuccess={googleLogin}
                onFailure={googleLogin}
                className="googleComponentBtn"
                theme="light"
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
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
  // googleLogin: (userData) => dispatch(googleLogin(userData))
});
export default ReduxContainer(Login, mapStateToProps, mapDispatchToProps);
