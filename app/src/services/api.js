import { axiosInstance as api } from './axios';


export class Api {
    static getComics() {
        return api.get('/comics');
    }
}