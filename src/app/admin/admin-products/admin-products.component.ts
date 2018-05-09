
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  product:Product[] ;
  subscription:Subscription;
  tableResource:DataTableResource<Product>;
  items: Product[] = [];
  itemCount:number;

  constructor(private productService: ProductService) { 
    this.productService.getAll()
      .subscribe(product => { 
        this.product = product;
        this.initializeTable(product);
      });
  }

  private initializeTable(product:Product[]){
    

    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }


  filter(query:string){
    let filteredProducts=(query)?this.product.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.product;
    this.initializeTable(filteredProducts);
  }
  
  ngOnInit() {
  }
  /*ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }*/
}
