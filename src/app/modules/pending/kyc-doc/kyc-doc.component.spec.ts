import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocComponent } from './kyc-doc.component';

describe('KycDocComponent', () => {
  let component: KycDocComponent;
  let fixture: ComponentFixture<KycDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
