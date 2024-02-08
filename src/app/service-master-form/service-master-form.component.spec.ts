import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMasterFormComponent } from './service-master-form.component';

describe('ServiceMasterFormComponent', () => {
  let component: ServiceMasterFormComponent;
  let fixture: ComponentFixture<ServiceMasterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceMasterFormComponent]
    });
    fixture = TestBed.createComponent(ServiceMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
