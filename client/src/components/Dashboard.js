import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import ImageList from '../containers/imagelist';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: '',
      images: [],
      description: '',
      upload: false,
      isComment: false,
      comment_body: '',
    };
  }

    handleUpload = (file) => {
      const data = new FormData();
      const image = file[0];
      // console.log(this.state.description)
      // data.append('ourImage', this.state.description)
      data.append('ourImage', image, this.state.description);
      this.props.uploadImage(data);
      this.setState({
        description: '',
      });
    }

    handleChange = (e) => {
      // e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value,
      });
      // console.log(this.state.description)
    }

    componentDidMount() {
      this.props.fetchImages();
      
      console.log(this.props.images)
    }

    onUploadClick = (e) => {
      e.preventDefault();
      this.setState({
        upload: !this.state.upload,
      });
    }

    deleteImg = (id) => {
      this.props.deleteImage(id);
    }

    render() {
      const uploader = (
        <ImageUploader
          withIcon
          withPreview
          onChange={this.handleUpload}
          singleImage
          buttonText="Upload an image"
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      );
      const { images, classes, likeCount, liked } = this.props;
 
      return (
        <div>
          <Grid style={{ height: '500px' }} container justify="center">
            <Grid item sm={8} md={6} className={classes.dashboardTitle}>
              <Typography align="center" variant="h6">
                        Welcome to the Dashboard
              </Typography>
              <Button onClick={this.onUploadClick} variant="outlined" component="span" color="primary">
                {/* toggle between Upload or Close
                                Will be upload by default, else if upload is clicked, close will show.
                            */}
                {!this.state.upload ? 'Upload' : 'Close'}
              </Button>
              <br />
              <br />
              {this.state.upload ? (
                <div>
                  <TextField
                    id="outlined-name"
                    label="Image Title"
                    name="description"
                    type="text"
                    required
                    fullWidth
                    style={{ borderRadius: '0px' }}
                    className=""
                    value={this.state.description}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <br />
                  <br />
                  {/* so here what we are saying, if this text field is FILLED show the uploader component
                                else hide it.
                                */}
                  {this.state.description ? uploader : null}
                </div>
              ) : (
                null
              )}
              <ImageList images={images} liked={liked}/>
            </Grid>
            {/* Images  */}
          </Grid>
        </div>
      );
    }
}
// Dashboard.propTypes = {
//   fetchImages: PropTypes.func.isRequired,
//   deleteImage: PropTypes.func.isRequired,
//   uploadImage: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   // type checking array of objects
//   images: PropTypes.arrayOf(
//     PropTypes.shape({
//       comments: PropTypes.arrayOf(
//         PropTypes.shape({
//           comment_body: PropTypes.string.isRequired,
//           created_at: PropTypes.string.isRequired,
//           id: PropTypes.number.isRequired,
//           image_id: PropTypes.number.isRequired,
//           updated_at: PropTypes.string.isRequired,
//           user: PropTypes.object.isRequired,
//           user_id: PropTypes.number.isRequired,
//         }),
//       ),
//       created_at: PropTypes.string.isRequired,
//       id: PropTypes.number,
//       image_title: PropTypes.string.isRequired,
//       image_url: PropTypes.string,
//       likes: PropTypes.array.isRequired,
//       updated_at: PropTypes.string.isRequired,
//       user: PropTypes.object.isRequired,
//       user_id: PropTypes.number.isRequired,
//     }),
//   ),
// };
export default Dashboard;
