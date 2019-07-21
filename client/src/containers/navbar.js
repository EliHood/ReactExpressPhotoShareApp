import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import { userLogOut } from '../actions/authActions';

const mapDispatchToProps = dispatch => ({
  userLogOut: () => dispatch(userLogOut()),
});
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
