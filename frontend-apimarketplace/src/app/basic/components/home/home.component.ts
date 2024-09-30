import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  apiData: any[] = [];
  filteredApis: any[] = []; // Para armazenar as APIs filtradas

  usuarioLogado = false;
  isConsumerLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log(this.isConsumerLoggedIn);
    this.loadCategories();
    this.router.events.subscribe(event => {
      this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
    })
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
          this.apiData = data.apiData;
          this.filteredApis = this.apiData; // Exibir todas as APIs inicialmente
        },
        (error) => {
          console.error('Error loading categories', error);
        }
      );
  }

  onAbaClick(index: number): void {
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

  getcategoryNome(apiCategoryId: number): string {
    const category = this.categories.find(c => c.id === apiCategoryId);
    return category ? category.name : 'category Desconhecida';
  }
}
