import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGoogleMapComponent } from './ngx-google-maps.component';

describe('NgxGoogleMapComponent', () => {
  let component: NgxGoogleMapComponent;
  let fixture: ComponentFixture<NgxGoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxGoogleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
