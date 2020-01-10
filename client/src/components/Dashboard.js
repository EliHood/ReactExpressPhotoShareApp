import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageList from '../containers/imagelist';
import ImageForm from './ImageForm';
export default function Dashboard (props) {
  const [description, setDescription] = useState('');
  const [upload, setUpload] = useState(false);
  const handleUpload = (file) => {
    const data = new FormData();
    const image = file[0];
    data.append('ourImage', image, description);
    console.log(props)
    props.uploadImage(data);
    setUpload(false)
    setDescription('')
  }
    // componentDidMount() {
    //   // props.fetchImages();
    //   console.log(this.props.images)
    // }
      const { images, classes } = props
      return (
        <div>
          <Grid style={{ height: '500px' }} container justify="center">
            <Grid item sm={8} md={6} className={classes.dashboardTitle}>
              <Typography align="center" variant="h6">
                        Welcome to the Dashboard
              </Typography>
              <Button onClick={(e) => setUpload(!upload)} variant="outlined" component="span" color="primary">
                {/* toggle between Upload or Close
                                Will be upload by default, else if upload is clicked, close will show.
                            */}
                {!upload ? 'Upload' : 'Close'}
              </Button>
              <br />
              <br />
              {upload ? (
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
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    margin="normal"
                  />
                  <br />
                  <br />
                  {/* so here what we are saying, if this text field is FILLED show the uploader component
                      else hide it.
                      */}
                  {description ? <ImageForm handleUpload={ handleUpload }/> : null}
                </div>
              ) : (
                null
              )}
              <ImageList images={images}/>
            </Grid>
            {/* Images  */}
          </Grid>
        </div>
      );
}
