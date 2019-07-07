import { put, fork, takeLatest, takeEvery,  call } from 'redux-saga/effects';
import api from '../api';
import { GET_IMAGES, POST_COMMENT,
     DELETE_IMAGE, UPLOAD_IMAGE } from '../actions/types';
import {fetchImagesSuccess, uploadImageFailure, fetchImageFailure, uploadImageSuccess, deleteImageFailure, deleteImageSuccess, postCommentSuccess, postCommentFailure} from '../actions/imageActions';
const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* getImages(action){
    try{
        const images = yield call(api.images.fetchImages);
        // console.log(images);
        yield delay(1000)
        yield put(fetchImagesSuccess(images))
    }
    catch(error){
        
        yield put(fetchImageFailure(error.response.data))
    }
}
export function* uploadImage(action){
    try{
        const image = yield call(api.images.uploadImage, action.data);
        console.log(image);
        yield put(uploadImageSuccess(image))
    }
    catch(error){
        yield put(uploadImageFailure(error.response.data))
    }
}
export function* deleteImage(action){
    try{
        const id = yield call(api.images.deleteImage, action.id)
        console.log(action)
        yield put(deleteImageSuccess(id, action.id))
    }
    catch(error){
        yield put(deleteImageFailure(error.response.data))
    }
}
export function* postComment(action){
    try{
        const data = yield call(api.images.postComment, action.data)
        console.log(action);
        yield put(postCommentSuccess(data, action.data.id))
    }
    catch(error){
        yield put(postCommentFailure(error.response.data))
    }
}
export function* watchImages() {
    yield takeEvery(GET_IMAGES, getImages);
  }
export function* watchCreateImage() {
    yield takeLatest(UPLOAD_IMAGE, uploadImage);
}
export function* watchDeleteImage() {
    yield takeLatest(DELETE_IMAGE, deleteImage);
}
export function* watchPostComment(){
    yield takeLatest (POST_COMMENT, postComment)
}
export default function* () {
    yield fork(watchImages);
    yield fork(watchCreateImage);
    yield fork(watchDeleteImage);
    yield fork (watchPostComment);
}