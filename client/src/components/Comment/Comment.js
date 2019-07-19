import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Comment = props => (
  <div>
    <form onSubmit={props.onSubmit}>
      <TextField
        type="text"
        id="outlined-multiline-static"
        label="Write A Comment"
        multiline
        name="comment_body"
        value={props.commentBody}
        rows="10"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={props.commentChange}
      />
      {/* <Button type="submit" variant="outlined" component="span" color="primary">
                Post A Comment
            </Button> */}
      <button type="submit" variant="outlined" component="span" color="primary">
                Write a Comment
      </button>
    </form>
  </div>
);

Comment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  commentBody: PropTypes.string.isRequired,
  commentChange: PropTypes.func.isRequired,

};

export default Comment;
