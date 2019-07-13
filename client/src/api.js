import Axios from './Axios';
export default {
    user:{
        loginUser: userData => 
            Axios.post('/users/login', userData).then(res => res.data),
        registerUser: userData => 
            Axios.post('/users/register', userData).then(res=> res.data),
        logoutUser: () => Axios.get('/users/logout').then(res => res.data),
        getUser:() => Axios.get('/users/current_user').then(res => res.data)
    },
    images:{
        fetchImages: () =>
            Axios.get('/images/uploads').then(res => res.data),
        uploadImage: data =>
            Axios.post('/images/upload', data).then(res => res.data),
        deleteImage: id =>
            Axios.post(`/images/delete/${id}`).then(res => res.data),
        postComment: data =>
           Axios.post('/images/newComment', data).then(res => res.data),
        likePost: id => 
            Axios.post(`/images/like/${id}`).then(res => res.data)

    }
};