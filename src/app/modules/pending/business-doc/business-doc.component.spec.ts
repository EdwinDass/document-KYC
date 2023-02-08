import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDocComponent } from './business-doc.component';

describe('BusinessDocComponent', () => {
  let component: BusinessDocComponent;
  let fixture: ComponentFixture<BusinessDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
