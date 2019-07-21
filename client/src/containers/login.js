import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginUser, googleLogin } from '../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
