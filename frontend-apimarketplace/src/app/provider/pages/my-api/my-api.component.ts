import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/basic/services/api/api.service';
import { ProviderService } from '../../services/provider.service';

// Definição de interfaces para tipagem correta
interface Param {
  id?: string;
  type: string;
  name: string;
  description?: string;
  optional?: boolean;
}

interface Endpoint {
  id?: string;
  url: string;
  name?: string;
  type: string;
  description: string;
  params?: Param[]; // Modificado para ser um array
}

interface ApiData {
  id: string;
  categoryId: number;
  provider: string;
  name: string;
  description: string;
  prices: { [key: string]: number };
  icon?: string;
  endpoints: { [key: string]: Endpoint };
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-my-api',
  templateUrl: './my-api.component.html',
  styleUrls: ['./my-api.component.css']
})
export class MyApiComponent implements OnInit {
  objectKeys = Object.keys;
  apiId: string | null = null;
  apiDetails: ApiData | null = null;
  categories: Category[] = [];
  activeTab: string = 'edit';
  newParamName: string = '';
  newEndpointName: string = '';
  showParamInput: boolean = false;
  showEndpointInput: boolean = false;
  selectedFile: string | ArrayBuffer | null = null; // Para armazenar a imagem selecionada
  openDropdowns: { [key: string]: boolean } = {}; // Controle de dropdowns

  // Lista de tipos disponíveis para parâmetros de requisição
  availableTypes: string[] = ['STRING', 'INTEGER', 'BOOLEAN', 'FLOAT', 'DOUBLE', 'ARRAY', 'OBJECT', 'DATE'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService, private providerService: ProviderService) { }

  ngOnInit(): void {
    // Captura o ID da API da rota
    this.apiId = this.route.snapshot.paramMap.get('id');

    if (this.apiId) {
      this.loadApiDetails(this.apiId);
    }
  }

  loadApiDetails(apiId: string): void {
    this.apiService.getApiById(apiId).subscribe(
      (data: ApiData) => {
        this.apiDetails = data;
      },
      (error) => {
        console.error('Error fetching API details:', error);
      }
    );
  }

 updateApiDetails(): void {
    if (this.apiDetails && this.apiId) {
      this.http.put(`https://api-seu-backend.com/apis/${this.apiId}`, this.apiDetails)
        .subscribe(
          (response) => {
            console.log('API details updated successfully:', response);
          },
          (error) => {
            console.error('Error updating API details:', error);
          }
        );
    }
  }

  updateEndpointDetails(endpointKey: string): void {
    if (this.apiDetails && this.apiId && this.apiDetails.endpoints[endpointKey]) {
      const endpointDetails = this.apiDetails.endpoints[endpointKey];
      const endpointId = endpointDetails.id;

      // Função para converter o tipo para a forma esperada pelo backend
      const convertType = (type: string | null | undefined): string => {
        if (!type) {
          return 'UNKNOWN'; // Ou qualquer valor padrão que você queira usar
        }
        switch(type.toLowerCase()) {
          case 'int':
            return 'INTEGER';
          case 'string':
            return 'STRING';
          case 'boolean':
            return 'BOOLEAN';
          case 'float':
            return 'FLOAT';
          case 'double':
            return 'DOUBLE';
          case 'array':
            return 'ARRAY';
          case 'object':
            return 'OBJECT';
          case 'date':
            return 'DATE';
          default:
            return type.toUpperCase();
        }
      };

      // Transformar os parâmetros de objeto para array e aplicar a conversão do tipo
      const paramsArray = Object.values(endpointDetails.params || {}).map(param => ({
        ...param,
        type: convertType(param.type) // Converte o tipo de cada parâmetro
      }));

      // Atualizar os dados completos do endpoint, incluindo os parâmetros como array
      const updatedEndpoint: Endpoint = {
        url: endpointDetails.url,
        type: convertType(endpointDetails.type), // Converte o tipo do endpoint também
        description: endpointDetails.description,
        params: paramsArray  // Incluindo os parâmetros no formato correto
      };

      console.log(updatedEndpoint);
      console.log(updatedEndpoint.params);

      this.providerService.updateEndpointById(endpointId!, updatedEndpoint)
        .subscribe(
          (response) => {
            console.log(`Endpoint ${endpointKey} updated successfully:`, response);
          },
          (error) => {
            console.error(`Error updating endpoint ${endpointKey}:`, error);
          }
        );
    }
  }

   addEndpoint(): void {
    if (this.apiDetails) {
      const newEndpoint: Endpoint = {
        id: '',
        url: '',
        name: '',
        type: '',
        description: '',
        params: []
      };
      const endpointKey = `endpoint${Object.keys(this.apiDetails.endpoints).length + 1}`;
      this.apiDetails.endpoints = { [endpointKey]: newEndpoint, ...this.apiDetails.endpoints };
    }

   }

  // Função para lidar com a troca de chave do endpoint
  onEndpointKeyChange(oldKey: string, newKey: string) {
    if (newKey && newKey !== oldKey && this.apiDetails?.endpoints) {
      if (this.apiDetails.endpoints[oldKey]) {
        this.apiDetails.endpoints[newKey] = this.apiDetails.endpoints[oldKey];
        delete this.apiDetails.endpoints[oldKey];
      }
    }
  }

  onAddParamClick(endpointKey: string): void {
    this.showParamInput = true; // Mostra o input para nome do parâmetro
  }

  onAddEndpointClick(): void {
    this.showEndpointInput = true; // Mostra o input para nome do endpoint
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result; // Armazena a imagem selecionada
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    }
  }

  confirmAddParam(endpointKey: string): void {
    if (this.newParamName) {
      const newParamKey = this.newParamName; // Usa o nome do parâmetro fornecido
      this.apiDetails!.endpoints[endpointKey].params!.push({ type: 'string', name: newParamKey, optional: false });

      const endpointId = this.apiDetails!.endpoints[endpointKey].id;

      this.providerService.addParameterToEndpoint(endpointId!, {name: newParamKey })
      .subscribe(
        (response) => {
          console.log(`Endpoint ${endpointKey} updated successfully:`, response);
        },
        (error) => {
          console.error(`Error updating endpoint ${endpointKey}:`, error);
        }
      );

      this.newParamName = ''; // Limpa o input
      this.showParamInput = false; // Oculta o input
    }
  }

  // Função para cancelar a adição de um parâmetro
  cancelAddParam(): void {
    this.newParamName = ''; // Limpa o input
    this.showParamInput = false; // Oculta o input
  }

  // Função para confirmar adição de um novo endpoint
  confirmAddEndpoint(): void {
    if (this.newEndpointName) {
      const newEndpoint: Endpoint = {
        id: '',
        url: '',
        name: this.newEndpointName,  // Usar o nome fornecido
        type: '',
        description: '',
        params: []
      };

      // Agora chama o serviço para enviar o POST
      this.providerService.addEndpointToApi(this.apiId!, {name: this.newEndpointName }).subscribe(
        (response) => {
          // Caso a requisição seja bem-sucedida, adiciona o endpoint na lista
          this.apiDetails!.endpoints[this.newEndpointName] = newEndpoint;
          console.log('Endpoint added successfully:', response);
        },
        (error) => {
          console.error('Error adding endpoint:', error);
        }
      );

      // Limpa o campo de nome e oculta o input
      this.newEndpointName = '';
      this.showEndpointInput = false;
    }
  }

  // Função para cancelar a adição de um endpoint
  cancelAddEndpoint(): void {
    this.newEndpointName = ''; // Limpa o input
    this.showEndpointInput = false; // Oculta o input
  }

  // Adiciona um novo parâmetro ao endpoint
  // addParam(endpointKey: string): void {
  //   if (this.apiDetails && this.apiDetails.endpoints[endpointKey]) {
  //     const newParamKey = `param${Object.keys(this.apiDetails.endpoints[endpointKey].params || {}).length + 1}`;
  //     this.apiDetails.endpoints[endpointKey].params = {
  //       ...this.apiDetails.endpoints[endpointKey].params,
  //       [newParamKey]: { type: 'string', name: newParamKey, optional: false }  // Parâmetro padrão
  //     };
  //   }
  // }

  // Remove um parâmetro específico de um endpoint
  // removeParam(endpointKey: string, paramKey: string): void {
  //   if (this.apiDetails && this.apiDetails.endpoints[endpointKey]?.params) {
  //     if (this.apiDetails.endpoints[endpointKey].params) {
  //       delete this.apiDetails.endpoints[endpointKey].params![paramKey];
  //     }
  //   }
  // }

  // Remove um endpoint específico da API
  removeEndpoint(endpointKey: string): void {
    if (this.apiDetails?.endpoints) {
      delete this.apiDetails.endpoints[endpointKey];
    }
  }

  toggleDropdown(key: string) {
    this.openDropdowns[key] = !this.openDropdowns[key];
  }

  convertType(type: string): string {
    switch(type.toLowerCase()) {
      case 'int':
        return 'INTEGER';
      case 'string':
        return 'STRING';
      case 'boolean':
        return 'BOOLEAN';
      case 'float':
        return 'FLOAT';
      case 'double':
        return 'DOUBLE';
      case 'array':
        return 'ARRAY';
      case 'object':
        return 'OBJECT';
      case 'date':
        return 'DATE';
      default:
        return type.toUpperCase(); // Por segurança, converte qualquer outro tipo para maiúsculas
    }
  }
}
