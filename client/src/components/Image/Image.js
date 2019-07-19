import React from 'react';
import PropTypes from 'prop-types';

const Image = props => (
  <img width="100%" height="100%" alt="stuff" src={props.image_url} />
);


Image.propTypes = {
  image_url: PropTypes.string.isRequired,
};
export default Image;
