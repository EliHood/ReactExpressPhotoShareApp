import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Comment from './Comment/Comment';
import Image from './Image/Image';
import CommentList from './CommentList';
export default function ImageContainer(props) {
    const [isComment, setIsComment] = useState(false)
    const [comment_body, setCommentBody] = useState('')
    const [heart, setHeart] = useState(false)
    const writeComment = (id) => {
      setIsComment(isComment ? '' : id)
    }
    const ourPostLike = (e, id) => {
      e.preventDefault()
      setHeart(!heart)
      const newHeart = true;
      const newData = {
        id, newHeart,
      };
      if (heart) {
        props.postLike(newData);
      } else {
        props.postDislike(newData)
      }
    }
    const commentSubmit = (e, id) => {
      e.preventDefault();
      console.log(comment_body); // doesn't get console.log
      // note that commentBody is being used for the req.body as well so its called by req.body.commentBody
      const commentBody = comment_body;
      const data = {
        commentBody,
        id,
      };
      if(props.postComment(data)){
          setIsComment(false)
          setCommentBody('')
      }
    }
      const {
        img, deleteImg, classes,  user:{ username }      } = props;
      return (
        <Grid item sm={12} md={12} className={classes.imageGridItem}>
          <LazyLoad throttle={200} height={600}>
            <Paper className={classes.imageContainerPaper}>
              {/* // empty image_title */}
              <Typography className={classes.imageTypographyTitle} variant="h4" align="center">{img.image_title}</Typography>
              <Divider className={classes.imageDivider} variant="middle" />
              <Image image_url={img.img_url} />
              <Typography variant="h6" align="center">{username}</Typography>
              <Typography variant="h6" align="center">{moment(img.created_at).calendar()}</Typography>
              <Button onClick={() => writeComment(img.id)} variant="outlined" component="span" color="primary">
                {isComment === img.id ? 'Close' : 'Write A Comment'} 
              </Button>
              {/* here were prevent comments being selected for all items in the array, renders the comment form you clicked on.  */}
              {isComment === img.id
              // if you want to pass a paramter and need use e.preventDefault this is how you would do it.
                ? (
                  <Comment
                    onSubmit={e => commentSubmit(e, img.id)}
                    commentBody={comment_body}
                    commentChange={(e) => setCommentBody(e.target.value)}
                  />
                )
                : null}
              {/* hide delete button when user enters comment */}
              {/* if user_id is equal too the current_user id, user can delete there post. */}
              {props.auth.current_user.user.id === img.user_id ? (
                <span>
                  {!isComment ? (
                    <Button className={classes.deleteButton} onClick={deleteImg} variant="outlined" component="span" color="primary">
                    Delete
                    </Button>
                  ) : null}
                </span>
              ) : (
                null
              )}
              <span className={classes.likeButton} onClick={e => ourPostLike(e, img.id)} style={{ cursor: 'pointer' }}>
                {heart
                  ? (
                    <span>
                      <Favorite style={{ color: 'tomato' }} />
                    </span>
                  )
                  : (
                    <span>
                      <FavoriteBorder />
                    </span>
                  ) }
                  {img.likeCount === '0' ? 'No Likes' : img.likeCount}
              </span>
              {/* image comments */}
              {/* if have comments show Comments */}
              {img.comments.length > 0 ? <Typography className={classes.commentsTitle} variant="h6" align="left">Commments </Typography> : null }
              <CommentList comments ={img.comments} classes={classes} />
            </Paper>
          </LazyLoad>
        </Grid>
      );
}
ImageContainer.propTypes = {
  postComment: PropTypes.func.isRequired,
  ourPostLike: PropTypes.func.isRequired,
};
