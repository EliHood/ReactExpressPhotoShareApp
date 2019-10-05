import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ImageContainer from '../containers/image';

class ImageList extends Component {
    deleteImg = (id) => {
      this.props.deleteImage(id);
    }
    render() {
      const { images} = this.props;
      return (
        images.length > 0 ? (
          images.map((img, i) => (
            <div key={i}>
              <ImageContainer img={img} deleteImg={() => this.deleteImg(img.id)} user={img.user}/>
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
  images: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          comment_body: PropTypes.string.isRequired,
          created_at: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          image_id: PropTypes.number.isRequired,
          updated_at: PropTypes.string.isRequired,
          user: PropTypes.object.isRequired,
          user_id: PropTypes.number.isRequired,
        }),
      ),
      created_at: PropTypes.string.isRequired,
      id: PropTypes.number,
      image_title: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      likeCount: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      user_id: PropTypes.number.isRequired,
    }),
  ),
};
export default ImageList;
