import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleModalPage } from './exemple-modal.page';

describe('ExempleModalPage', () => {
  let component: ExempleModalPage;
  let fixture: ComponentFixture<ExempleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExempleModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
