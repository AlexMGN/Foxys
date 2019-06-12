import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleModalPage } from './example-modal.page';

describe('ExampleModalPage', () => {
  let component: ExampleModalPage;
  let fixture: ComponentFixture<ExampleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
