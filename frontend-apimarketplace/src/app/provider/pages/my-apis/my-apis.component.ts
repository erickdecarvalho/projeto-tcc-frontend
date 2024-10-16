import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProviderService } from '../../services/provider.service';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

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

  constructor(private http: HttpClient, private providerService: ProviderService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUserApis();
  }

  loadCategories(): void {
    this.http.get<any>('./assets/db.json')
      .subscribe(
        (data: any) => {
          this.categories = data.categories;
        },
        (error: any) => {
          console.error('Error loading Categories', error);
        }
      );
  }

  loadUserApis(): void {
    this.providerService.getAllApisByUserId().subscribe(
      (data: any) => {
        this.userApis = data || [];
      },
      (error: any) => {
        console.error('Error loading APIs', error);
      }
    );
  }

  getLoggedUserId(): any {
    return UserStorageService.getUserId;
  }

  getCategoryName(apiCategoryId: number): string {
    const category = this.categories.find((c: any) => c.id === Number(apiCategoryId));
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
      //  ownerId: this.getLoggedUserId() // Simulando dono logado
      };

      this.userApis.push(newApiProject); // Adicionando o novo projeto à lista

      console.log(newApiProject);
      this.providerService.postApi(newApiProject).subscribe(res => {
        alert("cadastrado!");
      }, error => {
        alert("Deu erro");
      });

      this.closePopup(); // Fechar o popup após adicionar
      this.newApi = { name: '', description: '', categoryId: '' }; // Limpar o formulário
    } else {
      alert('Please fill all the fields');
    }
  }
}
