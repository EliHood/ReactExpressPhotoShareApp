import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { registerUser } from '../actions/authActions';
import SignUpForm from './SignUpForm/SignUpForm';
import ReduxContainer from '../reduxHOC';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: '',
        username: '',
        password: '',
        passwordConf: '',
        isAuthenticated: false,
      },
      password_error_text: '',
      errors: {},
      passErr: null,
      passwordConf_error_text: '',
      passwordConfpassErr: null,
    };
  }

  componentDidMount() {
    // console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  //   this line is magic, redirects to the dashboard after user signs up
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

    handleUsername= (e) => {
      e.preventDefault();
      const { formData } = this.state;
      this.setState({
        formData: {
          ...formData,
          username: e.target.value,
        },
      });
    }

    handleEmail= (e) => {
      e.preventDefault();
      const { formData } = this.state;
      this.setState({
        formData: {
          ...formData,
          email: e.target.value,
        },
      });
    }

    handlePassword = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      this.setState({
        formData: {
          ...formData,
          password: e.target.value,
        },
      });
    }

    handlePasswordConf = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      this.setState({
        formData: {
          ...formData,
          passwordConf: e.target.value,
        },

      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { formData } = this.state;
      const {
        username, email, password, passwordConf,
      } = formData;
      this.setState({
        username: this.state.username,
        password: this.state.password,
        passwordConf: this.state.passwordConf,
        email: this.state.email,
      });
      const creds = {
        username,
        email,
        password,
      };
      console.log(creds);
      if (password === passwordConf) {
        this.props.registerUser(creds, this.props.history);
      } else {
        this.setState({ passErr: "Passwords Don't Match" });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.formData.password.length !== prevState.formData.password.length) {
        if (this.state.formData.password.length <= 6) {
          this.setState({
            passErr: true,
            password_error_text: 'Password must be at least 6 Chars',
          });
          console.log(this.state.password_error_text);
        } else {
          this.setState({
            passErr: false,
            password_error_text: '',
          });
        }
      }
    }

    render() {
      // debugger;
      // console.log(this.state.formData.password)
      // console.log(this.state.password_error_text)
      // here we are making sure all fields are filled before we allow the button to appear
      const validation = {
        validation: !this.state.formData.email
                    || !this.state.formData.username
                    || !this.state.formData.password
                    || !this.state.formData.passwordConf
                    || this.state.formData.password.length <= 6
                    || this.state.formData.passwordConf.length <= 6,
      };
      return (
        <div>
          <Grid container justify="center" spacing={0}>
            <Grid item sm={10} md={6} lg={4} style={{ margin: '20px 0px' }}>
              <Typography variant="h4" style={{ letterSpacing: '2px' }}>
                         Sign Up
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
              {this.state.passErr && (
              <div style={{ color: 'red' }}>
                {this.state.passErr}
              </div>
              )}

              <SignUpForm
                signSubmit={this.handleSubmit}
                username={this.state.username}
                usernameChange={this.handleUsername}
                email={this.state.email}
                handleEmail={this.handleEmail}
                password_error_text={this.state.password_error_text}
                passErr={this.state.passErr}
                password={this.state.password}
                handlePassword={this.handlePassword}
                passwordConf_error_text={this.state.passwordConf_error_text}
                passwordConfpassErr={this.state.passwordConfpassErr}
                passwordConf={this.state.passwordConf}
                handlePasswordConf={this.handlePasswordConf}
                validation={validation.validation}
              />
            </Grid>

          </Grid>
        </div>
      );
    }
}
SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});
export default ReduxContainer(SignUp, mapStateToProps, mapDispatchToProps);
