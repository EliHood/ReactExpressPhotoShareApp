import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ImageContainer from './ImageContainer';
import { deleteImage } from '../actions/imageActions';
import ReduxContainer from '../reduxHOC';

class ImageList extends Component {
    deleteImg = (id) => {
      this.props.deleteImage(id);
    }

    render() {
      const { images } = this.props;
      return (
        images.length > 0 ? (
          images.map((img, i) => (
            <div key={i}>
              <ImageContainer img={img} deleteImg={() => this.deleteImg(img.id)} />
            </div>
          ))
        ) : (
          <div>
            <Grid item md={8}>
              <Typography>No Images yet</Typography>
            </Grid>
          </div>
        )
      );
    }
}

ImageList.propTypes = {
  deleteImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteImage: id => dispatch(deleteImage(id)),
});
export default ReduxContainer(ImageList, null, mapDispatchToProps);
