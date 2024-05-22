import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationComponent } from './ubication.component';

describe('UbicationComponent', () => {
  let component: UbicationComponent;
  let fixture: ComponentFixture<UbicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicationComponent]
    });
    fixture = TestBed.createComponent(UbicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
