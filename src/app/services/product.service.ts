import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductRequest } from '../models/product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiurl = "http://localhost:8080/api/products";

  constructor(private http:HttpClient) {}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  addProduct(product:ProductRequest):Observable<Product>{
    return this.http.post<Product>(this.apiurl, product);
  }

  deleteProduct(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }

  updateProduct(id:string, product:ProductRequest):Observable<Product>{
    return this.http.put<Product>(`${this.apiurl}/${id}`,product);
  }
}
 