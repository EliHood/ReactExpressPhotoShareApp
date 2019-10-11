import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import ImageList from '../containers/imagelist';

const ImageForm = (props) => (
    <ImageUploader
        withIcon
        withPreview
        onChange={props.handleUpload}
        singleImage
        buttonText="Upload an image"
        imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
        maxFileSize={5242880}
    />
)

export default ImageForm