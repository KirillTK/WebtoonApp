import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://webtoon-app.herokuapp.com/api',
  timeout: 1000,
});
