import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayOrderPage } from './pay-order.page';

describe('PayOrderPage', () => {
  let component: PayOrderPage;
  let fixture: ComponentFixture<PayOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
