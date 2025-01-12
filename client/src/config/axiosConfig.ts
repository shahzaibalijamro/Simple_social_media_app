import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://simple-social-media-app-server.vercel.app";

export default axios;