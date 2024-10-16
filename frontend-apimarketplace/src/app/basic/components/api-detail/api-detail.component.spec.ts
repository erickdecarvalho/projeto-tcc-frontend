import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDetailComponent } from './api-detail.component';

describe('ApiDetailComponent', () => {
  let component: ApiDetailComponent;
  let fixture: ComponentFixture<ApiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDetailComponent]
    });
    fixture = TestBed.createComponent(ApiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
