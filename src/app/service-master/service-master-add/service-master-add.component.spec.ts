import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMasterAddComponent } from './service-master-add.component';

describe('ServiceMasterAddComponent', () => {
  let component: ServiceMasterAddComponent;
  let fixture: ComponentFixture<ServiceMasterAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceMasterAddComponent]
    });
    fixture = TestBed.createComponent(ServiceMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
