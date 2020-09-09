import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMasterDetailsComponent } from './sales-master-details.component';

describe('SalesMasterDetailsComponent', () => {
  let component: SalesMasterDetailsComponent;
  let fixture: ComponentFixture<SalesMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
