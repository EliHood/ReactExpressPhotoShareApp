import {
  UPLOAD_IMAGE_SUCCESS,
  POST_COMMENT_SUCCESS,
  DELETE_IMAGE_FAILURE,
  FETCH_IMAGES_SUCCESS,
  POST_COMMENT,
  POST_LIKE,
  POST_LIKE_SUCCESS,
  DISLIKE_POST_SUCCESS,
  DELETE_IMAGE_SUCCESS,
  FETCH_IMAGES_FAILURE,
  POST_COMMENT_FAILURE,
} from '../types';
import { REHYDRATE, PURGE, FLUSH }from 'redux-persist'
import { stat } from 'fs';
import produce from 'immer';
// We use seamless-immutable but thats for
const initialState = {
  images: [],
  likeCount: [],
  liked: false,
  error:null,
};
const imageReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case FETCH_IMAGES_SUCCESS:
        console.log(action.images)
        draft.images = action.images
        break;
      case FETCH_IMAGES_FAILURE:
        console.log(action)
        draft.error = action.error
        break;
      case UPLOAD_IMAGE_SUCCESS:
        console.log(action.data);
        draft.images = [ action.data, ...draft.images]
        return 
      case UPLOAD_IMAGE_SUCCESS:
        console.log(action);
        draft.error = action.error
        return 
      case DELETE_IMAGE_SUCCESS:
        console.log(action.data)
        draft.images = [...draft.images.filter( (item) => item.id !== action.data)]
        return 
      case DELETE_IMAGE_FAILURE:
        draft.error = action.error
        return 
      case POST_COMMENT_SUCCESS:
        console.log(action.data[0]) // renders {type: "POST_COMMENT_SUCCESS", data: {…}, id: 39, @@redux-saga/SAGA_ACTION: true}
        const findKey = state.images.findIndex( x => x.id === action.id)
        draft.images[findKey].comments = [...draft.images[findKey].comments, action.data[0]]
        return;  
      case POST_COMMENT_FAILURE:
        draft.error = action.error
        return

    }
    
});

export default imageReducer;
