import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';

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

  validateForm!: FormGroup;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private providerService: ProviderService) {}

  ngOnInit(): void {
    this.loadUserApis();

    this.validateForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  loadUserApis(): void {
    this.providerService.getAllApisByUserId().subscribe(
      (data: any) => {
        console.log('Data received:', data);  // Verifica se os dados estão corretos
        this.userApis = data || [];  // Já que o retorno é um array diretamente
        console.log('User APIs:', this.userApis);  // Verifique se 'userApis' está sendo populado corretamente
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
        categoryId: 12,
      };

      this.userApis.push(newApiProject); // Adicionando o novo projeto à lista

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
