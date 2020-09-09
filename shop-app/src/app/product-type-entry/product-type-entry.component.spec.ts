import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeEntryComponent } from './product-type-entry.component';

describe('ProductTypeEntryComponent', () => {
  let component: ProductTypeEntryComponent;
  let fixture: ComponentFixture<ProductTypeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
