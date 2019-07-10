import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersPage } from './parameters.page';

describe('ParametersPage', () => {
  let component: ParametersPage;
  let fixture: ComponentFixture<ParametersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
