import { DataTableModule } from 'angular-4-data-table';
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  product:Product[];
  filteredProducts:any[];
  subscription:Subscription;


  constructor(private productService: ProductService) { 
    this.productService.getAll().subscribe(product=>this.filteredProducts=this.product=product);
  }

  filter(query:string){
    this.filteredProducts=(query)?this.product.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.product;
  }
  
  ngOnInit() {
  }
  /*ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }*/
}
