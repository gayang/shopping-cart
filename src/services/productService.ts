import axios from "axios";
import Product from "../types/Product";
import Category from '../types/Category';
import CreateProductInput from "../types/CreateProductInput";

class ProductService {
    http = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }
    },
    
    );

    //GET data
    async getAllProducts() {
        const response = await this.http.get<Product[]>('products');
        return response.data;
    }

    async getProductDetails(id:number) {
        const response = await this.http.get<Product>('products/'+ id);
        return response.data;
    }

    async searchProduct(title:string) {
        const response = await this.http.get<Product>('products/?title=' + title);
        return response.data;
    }

    async createProduct(product:CreateProductInput) {
        const response = await this.http.post<Product>('products/', product);
        
        return response.data;
    }

    async getByCategory() {
        const response = await this.http.get<Category[]>('categories');
        return response.data;
    }

    async getByCategoryId(id:string) {
        const response = await this.http.get<Category[]>('categories/'+id);
        return response.data;
    }

    async getProductByCategoryId(id: string) {
        const response = await this.http.get<Product[]>(`categories/${id}/products`);
        return response.data;
    }

    async getByPrice(price_min:number, price_max:number) {
        const response = await this.http.get<Product>(`products/?price_min=${price_min}&price_max${price_max}`);
        return response.data;
    }

    async getByPage(offset:number, limit:number) {
        const response = await this.http.get<Product[]>(`products?offset=${offset}&limit=${limit}`);
        return response.data;
    }
}
export default new ProductService();