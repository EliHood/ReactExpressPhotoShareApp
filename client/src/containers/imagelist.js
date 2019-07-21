import { deleteImage } from '../actions/imageActions';
import ImageList from '../components/ImageList';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    deleteImage: id => dispatch(deleteImage(id)),
});
export default connect(null, mapDispatchToProps)(ImageList)
  