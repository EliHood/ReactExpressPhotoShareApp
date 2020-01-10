import React, { Component, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ImageContainer from '../containers/image';

export default function ImageList(props){
  const deleteImg = (id) => {
    props.deleteImage(id);
  }
  const { images} = props;
    return (
      images.length > 0 ? (
        images.map((img, i) => (
          <div key={i}>
            <ImageContainer img={img} deleteImg={() => deleteImg(img.id)} user={img.user} index={i}/>
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
      updated_at: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      user_id: PropTypes.number.isRequired,
    }),
  ),
};

