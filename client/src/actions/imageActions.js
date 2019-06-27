import { GET_IMAGES, POST_COMMENT, DELETE_IMAGE, UPLOAD_IMAGE } from './types';
import Axios from '../Axios';
// sometimes the server doesn't connect to the /uploads right away so this is where sleep
// can be useful
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


// upload image 
export const uploadImage = data =>  {
   return async (dispatch) => {
        const post = await Axios.post('/images/upload', data)
        const newImage = await post.data
        console.log(newImage);
        dispatch({type:UPLOAD_IMAGE, newImage})
   } 
}
// get images
export const getImages = () => {
    return async (dispatch) => {      
       const url =  await Axios.get('/images/uploads');
       const data = await url.data;
    //    await sleep(800);=
        dispatch({ 
            type: GET_IMAGES,
           data
        })
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
        const url = await Axios.post('/images/newComment', data);
        const newComment = await url.data
        const id = data.id
        // console.log(newComment);
        dispatch({type:POST_COMMENT, newComment, id })
    }
}
