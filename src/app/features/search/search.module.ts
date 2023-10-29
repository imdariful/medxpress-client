import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule],
  exports: [SearchComponent],
})
export class SearchModule {}
