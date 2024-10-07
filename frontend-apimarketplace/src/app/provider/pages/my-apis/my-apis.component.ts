import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css']
})

export class MyApisComponent implements OnInit {
  userApis: any[] = [];
  apiData: any[] = [];
  categories: any[] = [];
  showAddProjectPopup: boolean = false; // Controle para exibir ou não o popup
  newApi: any = { name: '', description: '', categoryId: '' }; // Dados do novo API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserApis();
  }

  loadUserApis(): void {
    this.http.get<any>('./assets/db.json')
      .subscribe(
        (data: any) => {
          this.apiData = data.apiData;
          this.categories = data.categories;
          const loggedUserId = this.getLoggedUserId();
          this.userApis = this.apiData.filter(api => api.ownerId === loggedUserId);
        },
        (error: any) => {
          console.error('Error loading APIs', error);
        }
      );
  }

  getLoggedUserId(): number {
    return 1; // Supondo um ID de exemplo
  }

  getCategoryName(apiCategoryId: number): string {
    const category = this.categories.find((c: any) => c.id === apiCategoryId);
    return category ? category.name : 'Unknown category';
  }

  openPopup(): void {
    this.showAddProjectPopup = true;
  }

  closePopup(): void {
    this.showAddProjectPopup = false;
  }

  addProject(): void {
    if (this.newApi.name && this.newApi.description && this.newApi.categoryId) {
      const newApiProject = {
        name: this.newApi.name,
        description: this.newApi.description,
        categoryId: this.newApi.categoryId,
        ownerId: this.getLoggedUserId() // Simulando dono logado
      };

      this.userApis.push(newApiProject); // Adicionando o novo projeto à lista
      this.closePopup(); // Fechar o popup após adicionar
      this.newApi = { name: '', description: '', categoryId: '' }; // Limpar o formulário
    } else {
      alert('Please fill all the fields');
    }
  }
}
