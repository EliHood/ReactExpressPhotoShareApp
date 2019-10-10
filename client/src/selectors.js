import posts, * as fromPosts from './reducers/imageReducer';

export const getAllImages = (state) => {
    console.log(state)
    return fromPosts.getAllImages(state.image);
};
  