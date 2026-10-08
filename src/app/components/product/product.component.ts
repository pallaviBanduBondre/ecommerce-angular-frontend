import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductRequest } from '../../models/product-request';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  productForm = new FormGroup({

    name: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),

    price: new FormControl(0, [
      Validators.required, Validators.min(1)
    ]),

    category: new FormControl('', [
      Validators.required
    ])
  });

  selectedProductId: string | null = null;
  errorMessage : String = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.errorMessage = '';
        console.log("Products from backend ", data);

      },
      error: (error) => {
        console.error('Error loading products:', error);
        if(error.status === 0){
          this.errorMessage = 'Unable to connect to server.';

        }else {
          this.errorMessage = 'Unable to load products.';
        }
      }
    });
  }

  addProduct(): void {

    if (this.productForm.invalid) {
      this.productForm.markAsTouched();
      return;
    }

    const newProduct: ProductRequest = {
      name: this.productForm.value.name!,
      price: this.productForm.value.price!,
      category: this.productForm.value.category!
    };

    this.productService.addProduct(newProduct).subscribe({
      next: (product) => {
        console.log('Product added :', product);
        this.loadProducts();
        this.productForm.reset({
          name: '',
          price: 0,
          category: ''
        });

      },
      error: (error) => {
        console.error("Error adding product :", error);
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('product deleted successfully');
        this.loadProducts();
      },
      error: (error) => {
        console.error("Error deleting product:", error);
      }
    });
  }

  editProduct(product: Product): void {
    this.selectedProductId = product.id;

    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      category: product.category
    });
  }

  updateProduct(): void {

    if (this.selectedProductId === null) {
      return;
    }
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const updatedProduct: ProductRequest = {
      name: this.productForm.value.name!,
      price: this.productForm.value.price!,
      category: this.productForm.value.category!
    };

    this.productService
      .updateProduct(this.selectedProductId, updatedProduct)
      .subscribe({
        next: (product) => {
          console.log("product updated: ", product);

          this.loadProducts();
          this.productForm.reset({
            name: '',
            price: 0,
            category: ''
          })
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
  }

}
