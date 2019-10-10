import {
  put, fork, delay, takeLatest, call,
} from 'redux-saga/effects';
import api from '../api';
import {
  GET_IMAGES, POST_COMMENT, POST_LIKE,
  DELETE_IMAGE, UPLOAD_IMAGE, DISLIKE_POST
} from '../types';
import {
  fetchImagesSuccess,
  postLikeSuccess,
  uploadImageFailure,
  fetchImageFailure,
  dislikePostSuccess,
  uploadImageSuccess,
  deleteImageFailure,
  deleteImageSuccess,
  postCommentSuccess,
  postCommentFailure,
} from '../actions/imageActions';

export function* getImages() {
  try {
    const images = yield call(api.images.fetchImages);
    // debugger;
    yield put(fetchImagesSuccess(images));

  } catch (error) {
    yield put(fetchImageFailure(error.response));
  }
}


export function* uploadImage(action) {
  try {
    const image = yield call(api.images.uploadImage, action.data);
    console.log(image);
 
    yield put(uploadImageSuccess(image));
  } catch (error) {
    yield put(uploadImageFailure(error.response.data));
  }
}
export function* deleteImage(action) {
  try {
    const id = yield call(api.images.deleteImage, action.id);
    console.log(action);
    yield put(deleteImageSuccess(id, action.id));
  } catch (error) {
    yield put(deleteImageFailure(error.response.data));
  }
}
export function* postComment(action) {
  try {
    
    const data = yield call(api.images.postComment, action.data);
    yield put(postCommentSuccess(data, action.data.id));
  } catch (error) {
    yield put(postCommentFailure(error.response.data));
  }
}

export function* postLike(action) {
  try {
    const id = yield call(api.images.likePost, action.data.id);
    
    yield put(postLikeSuccess(id, action.data.id));
  
  } catch (err) {
     console.log(err); 
  }

}

export function* postDislike(action){
  try {
    const id = yield call(api.images.likePost, action.data.id);
    
    yield put(dislikePostSuccess(id, action.data.id))
  } catch (err) {
     console.log(err); 
  }

}

export function* watchImages() {
  yield takeLatest(GET_IMAGES, getImages);
}

export function* watchCreateImage() {
  yield takeLatest(UPLOAD_IMAGE, uploadImage);
}
export function* watchDeleteImage() {
  yield takeLatest(DELETE_IMAGE, deleteImage);
}

export function* watchPostLike() {
  yield takeLatest(POST_LIKE, postLike);
}

export function* watchPostDislike(){
 yield takeLatest(DISLIKE_POST, postDislike)
}

export function* watchPostComment() {
  yield takeLatest(POST_COMMENT, postComment);
}
export default function* () {
  yield fork(watchImages);
  yield fork(watchPostLike);
  yield fork(watchPostDislike)
  yield fork(watchCreateImage);
  yield fork(watchDeleteImage);
  yield fork(watchPostComment);
}
