import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAppFooterComponent } from './shop-app-footer.component';

describe('ShopAppFooterComponent', () => {
  let component: ShopAppFooterComponent;
  let fixture: ComponentFixture<ShopAppFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAppFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAppFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
