import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ImageContainer from '../containers/image';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
const CommentList = (props) => (
    <div className={props.classes.commentsBody}>
        {props.comments.length > 0 ? (
        props.comments.map((comment, i) => (
            <div key={i}>
            <List>
                <ListItem alignItems="center">
                <Typography color="primary" variant="body1">
                    {comment.comment_body}
                </Typography>
                </ListItem>
                <Typography className={props.classes.commentUsername} variant="caption" align="left">{comment.user.username}</Typography>
                <Typography className={props.classes.commentDate} variant="caption" align="right">{moment(comment.created_at).calendar()}</Typography>
                <Divider variant="fullWidth" component="li" />
            </List>
            </div>
        ))
        ) : (
        <div>
            <Typography className={props.classes.noCommentYet}>No Commments Yet</Typography>
        </div>
        )}
  </div>

);

export default CommentList;