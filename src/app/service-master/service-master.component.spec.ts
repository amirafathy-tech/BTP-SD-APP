import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMasterComponent } from './service-master.component';

describe('ServiceMasterComponent', () => {
  let component: ServiceMasterComponent;
  let fixture: ComponentFixture<ServiceMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceMasterComponent]
    });
    fixture = TestBed.createComponent(ServiceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
