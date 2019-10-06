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
} from '../types';
import { REHYDRATE, PURGE, FLUSH }from 'redux-persist'
import { stat } from 'fs';
// We use seamless-immutable but thats for
const initialState = {
  images: [],
  likeCount: [],
  liked: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.images,
      };
    case UPLOAD_IMAGE_SUCCESS:
      const newImage = action.data;
      console.log(newImage)
      return {
        ...state,
       images:  [newImage, ...state.images],
       // return state before and after
       ...state.images
      };
    case DELETE_IMAGE_SUCCESS:
      // console.log(action)
      return {
        ...state,
        images: state.images.filter(img => img.id !== action.data),
      };
    // case REHYDRATE:
    //   console.log(action.payload.image)
    //   const savedData = action.payload.image || initialState;
    //   return {
    //     ...state,
    //     ...savedData,
    //     ...state
    //   }
    case DELETE_IMAGE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case DISLIKE_POST_SUCCESS:
      let newVote = {...state}
      // const disLike = parseInt(newVote.images[0].likeCount)+ 1
      // console.log(disLike)
      console.log(newVote.images)
      return {
        ...state,
        images: state.images.map((image, idx) => {
          const disLike = parseInt(newVote.images[idx].likeCount) - 1
          // instead of referring to [0] well just use idx 
          // appends new comment withing images redux state. only if image.id === action.id
          if (image.id === action.data) {
            return {
              ...image,
              user: {...image.user},
              likeCount: disLike
            };
          }
          return image;
        }),
      };
    case POST_LIKE_SUCCESS:
      let newVote2 = {...state}
      console.log(newVote2.images)
      return {
        ...state,
        images: state.images.map((image, idx) => {
          const disLike = parseInt(newVote2.images[idx].likeCount) + 1
          // instead of referring to [0] well just use idx 
          // appends new comment withing images redux state. only if image.id === action.id
          if (image.id === action.data) {
            return {
              ...image,
              user: {...image.user},
              likeCount: disLike
            };
          }
          return image;
        }),
      };
    case POST_COMMENT_SUCCESS:
      //  adds a comment to a post without having to re render.
      console.log(action.data);
      return {
        ...state,
        images: state.images.map((image, idx) => {
          // instead of referring to [0] well just use idx 
          // appends new comment withing images redux state. only if image.id === action.id
          if (image.id === action.id) {
            return {
              ...image,
              comments: [
                ...image.comments, action.data[idx]
              ],
            };
          }
          return image;
        }),
      };
    default:
      return state;
  }
};