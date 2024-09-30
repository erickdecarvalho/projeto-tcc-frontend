import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa o HttpClientModule
import { ApisComponent } from './apis.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Para evitar erros com elementos personalizados

describe('ApisComponent', () => {
  let component: ApisComponent;
  let fixture: ComponentFixture<ApisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApisComponent], // Registro do componente
      imports: [HttpClientModule], // Importa o HttpClientModule
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Para evitar erros com elementos personalizados
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
