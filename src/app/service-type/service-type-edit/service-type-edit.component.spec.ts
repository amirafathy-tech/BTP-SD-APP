import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeEditComponent } from './service-type-edit.component';

describe('ServiceTypeEditComponent', () => {
  let component: ServiceTypeEditComponent;
  let fixture: ComponentFixture<ServiceTypeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTypeEditComponent]
    });
    fixture = TestBed.createComponent(ServiceTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
