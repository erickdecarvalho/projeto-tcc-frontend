import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApiComponent } from './my-api.component';

describe('MyApiComponent', () => {
  let component: MyApiComponent;
  let fixture: ComponentFixture<MyApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApiComponent]
    });
    fixture = TestBed.createComponent(MyApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
