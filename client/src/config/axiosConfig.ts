import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://simple-social-media-app-server-j5qer8wok.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export default axiosInstance;