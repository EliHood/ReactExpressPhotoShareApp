import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import dashboardStyles from '../styles/dashboardStyles';
import Dashboard from '../components/Dashboard';
import * as actionCreators from '../actions/imageActions';
import { 
   getImages
} from '../reducers';

const mapStateToProps = state => ({
  likeCount: state.image.likeCount,
  images: state.image.images,
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  fetchImages: () => dispatch(actionCreators.fetchImages()),
  deleteImage: id => dispatch(actionCreators.deleteImage(id)),
  uploadImage: data => dispatch(actionCreators.uploadImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyles)(Dashboard));
