import {axiosInstance as api} from './axios';
// import axios from 'axios';

export class Api {
  static getComics() {
    debugger;
    return api.get('/comics');
  }
}
