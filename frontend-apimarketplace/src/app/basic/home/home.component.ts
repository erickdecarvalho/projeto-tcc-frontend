import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  categorias: any[] = [];
  dadosApi: any[] = [];
  apisFiltradas: any[] = []; // Para armazenar as APIs filtradas

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 2000,  // Passa para o próximo slide a cada 2 segundos
        ride: 'carousel'
      });
    }
  }

  carregarCategorias(): void {
    this.http.get<any>('./assets/db.json')
      .subscribe(
        (data) => {
          this.categorias = data.categories;
          this.dadosApi = data.apiData;
          this.apisFiltradas = this.dadosApi; // Exibir todas as APIs inicialmente
        },
        (error) => {
          console.error('Erro ao carregar categorias', error);
        }
      );
  }

  onAbaClick(index: number): void {
    const categoria = this.categorias[index];

    // Alterna a categoria ativa
    categoria.ativa = !categoria.ativa;

    // Filtra as APIs com base na categoria ativa
    if (this.categorias.some(c => c.ativa)) {
      const categoriaAtiva = this.categorias.filter(c => c.ativa).map(c => c.id);
      this.apisFiltradas = this.dadosApi.filter(api => categoriaAtiva.includes(api.categoryId));
    } else {
      this.apisFiltradas = this.dadosApi; // Se nenhuma categoria estiver ativa, mostra todas
    }
  }

  getCategoriaNome(apiCategoryId: number): string {
    const categoria = this.categorias.find(c => c.id === apiCategoryId);
    return categoria ? categoria.name : 'Categoria Desconhecida';
  }
}
