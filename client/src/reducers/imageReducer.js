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

    case POST_LIKE_SUCCESS:
     
        return{
          ...state,
          likes: state.images.likes + 1
        }
    case DISLIKE_POST_SUCCESS:
        return{
          ...state,
          likes: state.images.likes - 1
        }

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
