import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { ApiService } from '../../services/api/api.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.css']
})
export class ApisComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  apiData: any[] = [];
  filteredApis: any[] = []; // Para armazenar as APIs filtradas

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  isConsumerLoggedIn: boolean = UserStorageService.isConsumerLoggedIn();

  usuarioLogado = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
    });
    this.loadCategories();
    this.apiData = []; // Inicializa como um array vazio para evitar 'undefined'
    this.filteredApis = []; // Inicializa como um array vazio
    this.loadApis();
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

  loadCategories(): void {
    this.http.get<any>('./assets/db.json')
      .subscribe(
        (data) => {
          this.categories = data.categories;
        },
        (error) => {
          console.error('Error loading categories', error);
        }
      );
  }

  loadApis(): void {
    console.log('Carregando APIs...');
    this.apiService.getAllApis().subscribe(
      (data: any) => {
        console.log('Dados da API recebidos:', data);
        if (data && data.length > 0) {
          this.apiData = data;
          this.filteredApis = this.apiData;
          console.log('API data carregado com sucesso:', this.apiData);
        } else {
          console.error('Nenhuma API encontrada.');
          this.apiData = [];
        }
      },
      (error) => {
        console.error('Erro ao carregar dados da API:', error);
        this.apiData = [];
      }
    );
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();

    if (searchTerm) {
      this.filteredApis = this.apiData.filter(api =>
      api.name.toLowerCase().includes(searchTerm) ||
      api.description.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredApis = this.apiData; // Se o campo de busca estiver vazio, mostra todas as APIs
    }
  }

  onCategoryChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedCategoryName = inputElement.value;
    console.log('Categoria selecionada:', selectedCategoryName);

    const selectedCategory = this.categories.find(c => c.name === selectedCategoryName);
    console.log('Categoria encontrada:', selectedCategory);

    if (!selectedCategory) {
      console.error('Categoria não encontrada:', selectedCategoryName);
      return;
    }

    selectedCategory.ativa = !selectedCategory.ativa;
    console.log('Categorias ativas:', this.categories.filter(c => c.ativa));

    if (!this.apiData || this.apiData.length === 0) {
      console.error('API data não definida ou vazia. Aguarde o carregamento.');
      return;
    }

    if (this.categories.some(c => c.ativa)) {
      const activeCategoryIds = this.categories.filter(c => c.ativa).map(c => c.id);
      console.log('Categorias ativas IDs:', activeCategoryIds);

      this.filteredApis = this.apiData.filter(api => activeCategoryIds.includes(api.category));
      console.log('APIs filtradas:', this.filteredApis);
    } else {
      this.filteredApis = this.apiData;
    }
  }

  onAbaClick(index: number): void {
    // Implement the logic for onAbaClick if needed
    console.log(`Aba clicked: ${index}`);
  }

  getcategoryNome(apiCategoryId: number): string {
    const category = this.categories.find(c => c.id === apiCategoryId);
    return category ? category.name : 'category Desconhecida';
  }
}
