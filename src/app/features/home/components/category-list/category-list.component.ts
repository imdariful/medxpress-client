/**
 * Component for displaying a list of categories.
 * @module CategoryListComponent
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  constructor(private router: Router) {}
  /**
   * Navigates to the category page when the category icon is clicked.
   */
  handleCategoryIconClick() {
    this.router.navigate(['/category']);
  }
}
