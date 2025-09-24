import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://social-media-app.askaritechnology.com";

export default axios;
