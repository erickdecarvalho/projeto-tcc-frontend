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

  getAllApis() {
    this.apiService.getAllApis().subscribe(res=> {
      this.apiData = res;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
    });
    this.getAllApis();
    this.loadCategories();
    console.log(this.apiData);
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
        //  this.apiData = data.apiData;
          this.filteredApis = this.apiData; // Exibir todas as APIs inicialmente
        },
        (error) => {
          console.error('Error loading categories', error);
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
    const index = this.categories.findIndex(category => category.id === +inputElement.value);
    if (index !== -1) {
      const category = this.categories[index];

      // Alterna a category ativa
      category.ativa = !category.ativa;

      // Filtra as APIs com base na category ativa
      if (this.categories.some(c => c.ativa)) {
        const activeCategory = this.categories.filter(c => c.ativa).map(c => c.id);
        this.filteredApis = this.apiData.filter(api => activeCategory.includes(api.categoryId));
      } else {
        this.filteredApis = this.apiData; // Se nenhuma category estiver ativa, mostra todas
      }
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
