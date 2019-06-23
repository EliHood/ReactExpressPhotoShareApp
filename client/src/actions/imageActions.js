import { GET_IMAGES, POST_COMMENT, DELETE_IMAGE, UPLOAD_IMAGE } from './types';
import Axios from '../Axios';

// upload image 
export const uploadImage = data =>  {
   return (dispatch) => {
    Axios.post('/images/upload', data).then((response) => {
        const newImage = {...response.data}
        console.log(newImage);
        dispatch({type:UPLOAD_IMAGE, newImage})
    });

   } 

}


// get images
export const getImages = () => {
    return (dispatch) => {
        return Axios.get('/images/uploads').then( (response) => {
                const data = response.data;
                dispatch({ 
                    type: GET_IMAGES,
                    data
                })
            });
    }
}

// delete image

export const deleteImage = id =>  {
    return async (dispatch) => {
        return Axios.post(`/images/delete/${id}`).then( () => {
             dispatch({ type:DELETE_IMAGE, payload:id})
        })
    }
}

// post comment

export const postComment = data => {
    return async (dispatch) => {
        return Axios.post('/images/newComment', data).then( (response )=> {
            const newComment = response.data;
            const id = data.id
            // console.log(newComment);
            

            dispatch({type:POST_COMMENT, newComment, id })
           
          
        })
    }
}