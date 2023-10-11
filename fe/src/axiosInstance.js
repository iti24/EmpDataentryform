import axios from 'axios';
const token = localStorage.getItem('jwtToken');
// Create an instance of Axios with custom configurations
const axiosInstance = axios.create({
  baseURL:"http://localhost:4000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;

// const axiosWithAuth = axios.create({
//     baseURL: '/api', // Your server's base URL
   
//   });