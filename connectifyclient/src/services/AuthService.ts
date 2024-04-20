import $api from "../http";
import axios, { AxiosResponse } from 'axios';
// import { LoginResponse } from "../models/response/LoginResponse";
import { AUTH_CONTROLLER_ROUTE } from "../utils/consts"
import Cookies from "js-cookie";

export default class AuthService {
    //TODO типизировать 
    static async login(username: string, password: string): Promise<AxiosResponse<any>> {
        console.log("username внутри login: ", username)
        console.log("password внутри login: ", password)

        //TODO типизировать 
        // const result = axios.post<LoginResponse>(`/api${AUTH_CONTROLLER_ROUTE}/login`, { username: username, password: password })
        const result = axios.post<any>(`/api${AUTH_CONTROLLER_ROUTE}/login`, { username: username, password: password })
        const response = await result;
        if (response) {
            const newAccessTokenToken =response.data.accessToken;
            localStorage.setItem('token', newAccessTokenToken);
            const newRefreshToken =response.data.refreshToken;
            Cookies.set('refreshToken', newRefreshToken);
        }

        return result;
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<any>> {
        return axios.post<any>(`/api${AUTH_CONTROLLER_ROUTE}/register`, { username: username, email: email, password: password })
    }
    
    static async logout(): Promise<void> {
        return $api.post(`/api${AUTH_CONTROLLER_ROUTE}/logout`)
    }

    static async updateUser(id: number, username: string, email: string): Promise<void> {
        return $api.post(`/api${AUTH_CONTROLLER_ROUTE}/updateUser`, { id: id, username: username, email: email})
    }

}
