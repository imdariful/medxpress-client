import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsModule } from '../products/products.module';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SearchModule } from '../search/search.module';
import { CategoryProductGridComponent } from './components/category-product-grid/category-product-grid.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsByCategoryComponent,
    ProductComponent,
    CategoryListComponent,
    CategoryProductGridComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ProductsModule,
    SearchModule,
  ],
})
export class HomeModule {}
