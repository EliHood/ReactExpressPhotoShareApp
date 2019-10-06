import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
export default class Home extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center" spacing={0} style={{ margin: '20px 0px' }}>
          <Grid item sm={10} md={6} lg={4}>
            <Typography variant="h4" style={{ letterSpacing: '2px' }}>
                Welcome
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
