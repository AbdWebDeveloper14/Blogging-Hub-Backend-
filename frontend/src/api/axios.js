import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blogging-hub-backend-64477fylk-pixelperfectdesigns-projects.vercel.app', 
});

export default API;