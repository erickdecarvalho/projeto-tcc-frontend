import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'bootstrap';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  apiData: any[] = [];
  filteredApis: any[] = []; // Store filtered APIs

  usuarioLogado = false;
  isConsumerLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.router.events.subscribe(event => {
      this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
    });

    this.apiData = []; // Initialize as an empty array to prevent 'undefined'
    this.filteredApis = []; // Initialize as an empty array
    this.loadApis();
  }

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExampleIndicators');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 2000, // Pass to the next slide every 2 seconds
        ride: 'carousel'
      });
    }
  }

  loadCategories(): void {
    this.http.get<any>('./assets/db.json').subscribe(
      (data) => {
        this.categories = data.categories;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  loadApis(): void {
    this.apiService.getAllApis().subscribe(
      (data: any) => {
        this.apiData = data;
        this.filteredApis = data || [];

        console.log(this.apiData);
        console.log(this.filteredApis);
      },
      (error: any) => {
        console.error('Error loading APIs', error);
      }
    );
  }

  onAbaClick(index: number): void {
    const category = this.categories[index];

    category.ativa = !category.ativa;

    if (this.categories.some(c => c.ativa)) {
      const activeCategoryIds = this.categories.filter(c => c.ativa).map(c => c.id);
      this.filteredApis = this.apiData.filter(api => activeCategoryIds.includes(api.category));
    } else {
      this.filteredApis = this.apiData;
    }
  }

  getcategoryNome(apiCategoryId: number): string {
    const category = this.categories.find(c => c.id === apiCategoryId);
    return category ? category.name : 'Categoria Desconhecida';
  }

  getIconName(apiCategoryId: number): string {
    const category = this.categories.find(c => c.id === apiCategoryId);
    if (category) {
      return `${category.name.toLowerCase()}.png`;
    } else {
      return 'default.png';
    }
  }
  getCategoryIcon(category: any): string {
    return category ? `${category.name.toLowerCase()}.png` : 'default.png';
  }
}