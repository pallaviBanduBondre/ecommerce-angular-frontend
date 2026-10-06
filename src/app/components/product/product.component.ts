import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ProductRequest } from '../../models/product-request';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
 products: Product[] = [];

 name : string = '';
 price : number = 0;
 category : string = '';

 selectedProductId : string | null = null;

 constructor(private productService: ProductService){}
 
 ngOnInit(): void {
   this.loadProducts();
 }

 loadProducts():void{
  this.productService.getProducts().subscribe({
    next: (data) => {
      this.products = data;
      console.log("Products from backend ", data);
    },
    error: (error) => {
      console.error('Error loading products:', error);
    }
  });
}

  addProduct(): void{

    const newProduct: ProductRequest = {
      name:this.name,
      price: this.price,
      category: this.category
    };

    this.productService.addProduct(newProduct).subscribe({
        next:(product) => {
          console.log('Product added :', product );
          this.loadProducts();
          this.name = '';
          this.price = 0;
          this.category = '';
        },
        error: (error) =>{
          console.error("Error adding product :", error);
        }
    });
  }  

    deleteProduct(id:string):void{
      this.productService.deleteProduct(id).subscribe({
        next: () =>{
          console.log('product deleted successfully');
          this.loadProducts();
        },
        error : (error) => {
          console.error("Error deleting product:", error);
        }
      });
    }
  
 editProduct(product: Product):void{
  this.selectedProductId = product.id;

  this.name = product.name;
  this.price = product.price;
  this.category = product.category;
 }

 updateProduct():void {
   
  if(this.selectedProductId === null){
    return;
  }

  const updatedProduct:ProductRequest = {
    name:this.name,
    price: this.price,
    category: this.category
  };

  this.productService
      .updateProduct(this.selectedProductId, updatedProduct)
      .subscribe({
        next: (product) => {
          console.log("product updated: ", product);

          this.loadProducts();
          this.name = '',
          this.price = 0,
          this.category = '',
          this.selectedProductId = null;
        },
        error: (error) =>{
          console.error('Error updating product:', error);
        }
      });
 }

}
