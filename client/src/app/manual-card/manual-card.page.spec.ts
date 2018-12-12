import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCardPage } from './manual-card.page';

describe('ManualCardPage', () => {
  let component: ManualCardPage;
  let fixture: ComponentFixture<ManualCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
