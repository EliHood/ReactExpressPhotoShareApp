import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ImageContainer from '../components/ImageContainer';
import imageStyles from '../styles/imageStyles';
import * as actionCreators from '../actions/imageActions';

const mapStateToProps = state => ({
  image: state.image,
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  postComment: data => dispatch(actionCreators.postComment(data)),
  postLike: data => dispatch(actionCreators.postLike(data)),
  postDislike : data => dispatch(actionCreators.postDislike(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(imageStyles)(ImageContainer));
