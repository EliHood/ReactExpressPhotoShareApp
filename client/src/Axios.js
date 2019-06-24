import Axios from 'axios';
import 'dotenv/config';

let AxiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,  // localhost:3000
    withCredentials: true,
    headers : {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    }
  
  })
  
  
  
  AxiosInstance.interceptors.response.use(function(response) {
    // const token = localStorage.getItem('auth');
    // response.headers.Authorization =  token ? `Bearer ${token}` : '';
    // console.log(token);
    return response;
  })
  
  export default AxiosInstance