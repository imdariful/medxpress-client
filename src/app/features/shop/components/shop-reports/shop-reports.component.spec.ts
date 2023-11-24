import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopReportsComponent } from './shop-reports.component';

describe('ShopReportsComponent', () => {
  let component: ShopReportsComponent;
  let fixture: ComponentFixture<ShopReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopReportsComponent]
    });
    fixture = TestBed.createComponent(ShopReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
