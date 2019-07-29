import {
  GET_IMAGES,
  POST_COMMENT,
  DELETE_IMAGE,
  UPLOAD_IMAGE,
  LIKED_BY_USER,
  DISLIKE_POST_SUCCESS,
  POST_LIKE,
  POST_LIKE_SUCCESS,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE,
  UPLOAD_IMAGE_FAILURE,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
} from './types';
// sometimes the server doesn't connect to the /uploads right away so this is where sleep
// can be useful
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const fetchImages = () => ({
  type: GET_IMAGES,

});

export const fetchImagesSuccess = (images ) => ({
  type: FETCH_IMAGES_SUCCESS,
  images,

});

export const postLike = data => ({
  type: POST_LIKE,
  data,
});

export const postLikeSuccess = (id, data) => ({
  type: POST_LIKE_SUCCESS,
  id,
  data

});

export const dislikePostSuccess = (id, data) => ({
  type: DISLIKE_POST_SUCCESS,
  id,
  data
})

export const fetchImageFailure = error => ({
  type: FETCH_IMAGES_FAILURE,
  error,
});
export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  data,
});
export const uploadImageSuccess = data => ({
  type: UPLOAD_IMAGE_SUCCESS,
  data,
});
export const uploadImageFailure = error => ({
  type: UPLOAD_IMAGE_FAILURE,
  error,
});
export const deleteImage = id => ({
  type: DELETE_IMAGE,
  id,
});
export const deleteImageSuccess = (id, data) => ({
  type: DELETE_IMAGE_SUCCESS,
  id,
  data,
});
export const deleteImageFailure = error => ({
  type: DELETE_IMAGE_FAILURE,
  error,
});


export const postComment = data => ({
  type: POST_COMMENT,
  data,
});
export const postCommentSuccess = (data, id) => ({
  type: POST_COMMENT_SUCCESS,
  data,
  id,

});
export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  error,
});
