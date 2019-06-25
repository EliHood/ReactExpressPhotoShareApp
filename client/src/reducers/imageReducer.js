import { GET_IMAGES, POST_COMMENT, DELETE_IMAGE, UPLOAD_IMAGE } from '../actions/types';
const initialState = {
    images:[],
}
export default  (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            console.log(action.data);
            return{
                ...state,
                images:action.data
            }
        case UPLOAD_IMAGE:
            const newImage = action.newImage
            console.log(newImage[0]); // gets the new uploaded image. 
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
                images: state.images.filter( (img) => img.id !== action.payload)
            }
        case POST_COMMENT:
            //  adds a comment to a post without having to re render.
            // console.log(action.data.commentBody);
            console.log(action.newComment[0]);
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
                                        comment_body:  action.newComment[0].comment_body,
                                        user:{
                                            username:action.newComment[0].user.username
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