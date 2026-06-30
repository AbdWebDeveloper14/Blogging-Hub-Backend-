import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blogging-hub-backend.vercel.app/api', 
});

export default API;