import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyApisComponent } from './my-apis.component';

describe('MyApisComponent', () => {
  let component: MyApisComponent;
  let fixture: ComponentFixture<MyApisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApisComponent]
    });
    fixture = TestBed.createComponent(MyApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
