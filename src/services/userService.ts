import axios from "axios";
import User from "../types/User";

class UserService {
    http = axios.create({
        baseURL: 'http://localhost:8080/api/v1'
    },
    
    );
    //GET
    async getAllUsers() {
        const response = await this.http.get<User[]>('/users');
        return response.data;
    }
    async getSingleUser(id:number) {
        const response = await this.http.get<User>('/users/'+ id);
        return response.data;
    }

    //POST
    async createUser() {
        const response = await this.http.post<User[]>('/users');
        return response.data;
    }
    async updateUser(id:number) {
        const response = await this.http.get<User>('/users/'+ id);
        return response.data;
    }
    async isUserAvalable(email:string) {
        const response = await this.http.get<User>('/users/is-available');
        return response.data;
    }
}
export default new UserService();