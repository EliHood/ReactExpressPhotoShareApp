import { 
GET_IMAGES, UPLOAD_IMAGE_SUCCESS, POST_COMMENT_SUCCESS, 
DELETE_IMAGE_FAILURE, FETCH_IMAGES_SUCCESS, 
POST_COMMENT,
DELETE_IMAGE, UPLOAD_IMAGE, DELETE_IMAGE_SUCCESS } from '../actions/types';
const initialState = {
    images:[],
}
export default  (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            return{
                ...state,
                // images:action.data
            }
        case FETCH_IMAGES_SUCCESS:
            return{
                ...state,
                images:action.images
            }
        case UPLOAD_IMAGE:
            return{
                ...state
            }
        case UPLOAD_IMAGE_SUCCESS:
            const newImage = action.data
            return {           
                images:[
                    {
                        id: newImage[0].id,
                        user:{
                            username:newImage[0].user.username
                        },
                        comments:{
                        comment_body: newImage[0].comments.comment_body  
                        },
                        image_title: newImage[0].image_title,
                        img_url: newImage[0].img_url,
                    },
                    ...state.images, // pass the previous images, 
                ]   
            }
        case DELETE_IMAGE:
            return{
                ...state,
            }
        case DELETE_IMAGE_SUCCESS:
            // console.log(action)
            return{
                ...state,
                images: state.images.filter( (img) => img.id !== action.data)
            }
        case DELETE_IMAGE_FAILURE:
            return{
                ...state,
                error: action.error
            }
        case POST_COMMENT:
           return{
               ...state
           }
        case POST_COMMENT_SUCCESS:
            //  adds a comment to a post without having to re render.
            // console.log(action.data.commentBody);
                return {
                    ...state,
                    images: state.images.map((image) => {
                        // appends new comment withing images redux state. only if image.id === action.id
                        if(image.id === action.id){  
                            return {
                                ...image,                             
                                comments: [
                                    ...image.comments,
                                    {
                                        comment_body:  action.data[0].comment_body,
                                        user:{
                                            username:action.data[0].user.username
                                        }
                                    },                                
                                ]
                            }
                        }else {
                            return image
                        }
                    })
                }
        default:
            return state;
    }
}