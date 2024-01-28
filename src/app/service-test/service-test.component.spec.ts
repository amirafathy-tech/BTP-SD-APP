import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTestComponent } from './service-test.component';

describe('ServiceTestComponent', () => {
  let component: ServiceTestComponent;
  let fixture: ComponentFixture<ServiceTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTestComponent]
    });
    fixture = TestBed.createComponent(ServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
