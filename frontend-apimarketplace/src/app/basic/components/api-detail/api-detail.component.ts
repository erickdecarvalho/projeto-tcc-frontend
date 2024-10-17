import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para capturar o parâmetro da rota
import { HttpClient } from '@angular/common/http'; // Para fazer requisição HTTP
import { ApiService } from '../../services/api/api.service';

interface Provider {
  id: string;
  email: string;
  organizationName: string;
  username: string;
}

interface Param {
  type: string;
  name: string;
  description?: string; // Correção no nome do campo
  optional?: boolean;
}

interface Endpoint {
  id: string;
  url: string;
  type: string;
  name: string;
  description: string;
  params?: Param[];
  example?: { curl: string; javascript: string; python: string }; // O exemplo é opcional
}

interface ApiData {
  id: string;
  category: number;
  name: string;
  description: string;
  price?: number | null; // `price` pode ser nulo
  providerId: Provider;
  icon?: string;
  endpoints: Endpoint[];
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css']
})
export class ApiDetailComponent implements OnInit {
  objectKeys = Object.keys;
  apiId: string | null = null;
  apiDetails: ApiData | null = null; // Tipo da API
  categories: any[] = []; // Lista de categorias
  activeTab: string = 'overview'; // Aba inicial é 'overview'
  openDropdowns: { [key: string]: boolean } = {}; // Controle de dropdowns

  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService) { }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.apiId = this.route.snapshot.paramMap.get('id');

    if (this.apiId) {
      this.loadApiDetails(this.apiId);
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

  loadApiDetails(apiId: string): void {
    this.apiService.getApiById(apiId).subscribe(
      (data: ApiData) => {
        this.apiDetails = data;

        if (this.apiDetails.endpoints) {
          this.apiDetails.endpoints = this.generateExamplesForEndpoints(this.apiDetails.endpoints);
        }

        console.log("Data received: ", data);
        console.log("this.apiDetails: ", this.apiDetails);
      },
      (error) => {
        console.error('Error fetching API details:', error);
      }
    );
  }

  generateExamplesForEndpoints(endpoints: Endpoint[]): Endpoint[] {
    return endpoints.map(endpoint => {
      endpoint.example = this.generateExamples(endpoint.url, endpoint.type, endpoint.params);
      return endpoint;
    });
  }

  generateExamples(url: string, type: string, params?: Param[]): { curl: string; javascript: string; python: string } {
    const baseUrl = `https://api.example.com`;

    // Construindo os parâmetros para a URL
    const paramString = params?.map(param => `${param.name}={${param.name}}`).join('&') || '';

    // URL completa
    const fullUrl = paramString ? `${baseUrl}${url}?${paramString}` : `${baseUrl}${url}`;

    // Gerando exemplos
    const curl = `curl -X ${type.toUpperCase()} "${fullUrl}"`;
    const javascript = `fetch("${fullUrl}").then(response => response.json())`;
    const python = `import requests\nresponse = requests.${type.toLowerCase()}("${fullUrl}")\nprint(response.json())`;

    return { curl, javascript, python };
  }

  toggleDropdown(key: string) {
    this.openDropdowns[key] = !this.openDropdowns[key]; // Alterna o estado do dropdown
  }

  getcategoryNome(apiCategoryId: number): string {
    const category = this.categories.find(c => c.id === apiCategoryId);
    return category ? category.name : 'category Desconhecida';
  }

  // Função para extrair o tipo do parâmetro
  extractParamType(param: Param | undefined): string {
    if (!param) {
      return 'UNKNOWN'; // or throw an error
    }
    return param.type.toUpperCase(); // Usar o tipo diretamente da interface Param
  }

  // Define o tipo de input com base no tipo do parâmetro
  getInputType(param: Param | undefined): string {
    if (!param) return 'text'; // Default to text

    switch (param.type.toUpperCase()) {
      case 'STRING':
        return 'text';
      case 'INTEGER':
      case 'NUMBER':
        return 'number';
      case 'BOOLEAN':
        return 'checkbox';
      case 'ARRAY':
        return 'text'; // Customize as needed
      default:
        return 'text';
    }
  }

  // Define o valor de exemplo com base no tipo do parâmetro
  getExampleValue(param: Param | undefined): string {
    if (!param) return '';

    switch (param.type.toUpperCase()) {
      case 'STRING':
        return 'Text';
      case 'INTEGER':
      case 'NUMBER':
        return '123';
      case 'BOOLEAN':
        return ''; // O input de checkbox não precisa de valor
      case 'ARRAY':
        return '["item1", "item2"]'; // Exemplo de array
      default:
        return '';
    }
  }

  // Funções de ações (caso queira adicionar)
  editParam(paramKey: string) {
    // Função para editar o parâmetro
  }

  removeParam(paramKey: string) {
    // Função para remover o parâmetro
  }
}
