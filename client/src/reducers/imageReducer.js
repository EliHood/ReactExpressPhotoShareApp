import {
  UPLOAD_IMAGE_SUCCESS,
  POST_COMMENT_SUCCESS,
  DELETE_IMAGE_FAILURE,
  FETCH_IMAGES_SUCCESS,
  POST_COMMENT,
  POST_LIKE,
  POST_LIKE_SUCCESS,
  DELETE_IMAGE_SUCCESS,
  DISLIKE_POST_SUCCESS,
} from '../actions/types';
const initialState = {
  images: [],
  likeCount: []
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
      return {
        ...state,
        images:  [newImage[0], ...state.images]
      };
    case DELETE_IMAGE_SUCCESS:
      // console.log(action)
      return {
        ...state,
        images: state.images.filter(img => img.id !== action.data),
      };
    case DELETE_IMAGE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case POST_LIKE:
      console.log(action);
      return {
        ...state,
      };
    // case POST_LIKE_SUCCESS:
    //   console.log(action.data);
    //   const newState = { ...state }; // here I am trying to shallow  copy the existing state;
    //   const existingLikesOfPost = newState.images.find(image => image.id === action.data).likes;
    //   newState.images.find(image => image.id === action.data).likes = [...existingLikesOfPost, action.newLikeObject]; // using this approach I got some code duplication so I suggested the first approach of using **push** method of array.
    //   // console.log(newState)
    //   return newState;
    case DISLIKE_POST_SUCCESS:
      const newState = { ...state }; // here I am trying to shallow  copy the existing state;
      const existingLikesOfPost = newState.images.find(image => image.id === action.data).likes;
      newState.images.find(image => image.id === action.data).likes = [...existingLikesOfPost, action.newLikeObject] // using this approach I got some code duplication so I suggested the first approach of using **push** method of array.
      return newState - 1 ;
    case POST_COMMENT:
      return {
        ...state,
      };
    case POST_COMMENT_SUCCESS:
      //  adds a comment to a post without having to re render.
      console.log(action.data);
      console.log(state.likeCount)  
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
