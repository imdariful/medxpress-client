import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsByCategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsByCategoryComponent,
    CategoryListComponent
  ]
})
export class ProductsModule { }
