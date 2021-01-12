import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAppNavComponent } from './shop-app-nav.component';

describe('ShopAppNavComponent', () => {
  let component: ShopAppNavComponent;
  let fixture: ComponentFixture<ShopAppNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAppNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAppNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
