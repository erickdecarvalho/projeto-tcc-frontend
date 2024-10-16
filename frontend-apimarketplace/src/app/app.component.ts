import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from './basic/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-apimarketplace';
  isConsumerLoggedIn: boolean = false;
  isProviderLoggedIn: boolean = false;

  // Adicionando as propriedades que faltam
  usuarioLogado: boolean = false; // Define se o usuário está logado
  menuAberto: boolean = false; // Define se o menu do usuário está aberto
  username: string = ''; // Para armazenar o nome de usuário
  email: string = ''; // Para armazenar o e-mail do usuário

  constructor(private router: Router) {}

  ngOnInit() {
    // Verifica o status de login inicial
    this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
    this.usuarioLogado = this.isConsumerLoggedIn;

    // Inscreve-se para eventos de navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
        this.isProviderLoggedIn = UserStorageService.isProviderLoggedIn();

        this.usuarioLogado = this.isConsumerLoggedIn || this.isProviderLoggedIn;

        // Aqui você pode carregar os detalhes do usuário se necessário
        if (this.usuarioLogado) {
          // Carregar detalhes do usuário (username e email)
          this.username = UserStorageService.getUser(); // Exemplo de método que você deve implementar
          this.email = UserStorageService.getUserEmail(); // Exemplo de método que você deve implementar
        }
      }
    });
  }

  logout() {
    // Realiza o logout e redireciona para a página de login
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  toggleUserMenu() {
    // Alterna o estado do menu do usuário
    this.menuAberto = !this.menuAberto;
  }
}
