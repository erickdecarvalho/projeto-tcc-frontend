import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from './basic/services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'frontend-apimarketplace';

  isConsumerLoggedIn: boolean = UserStorageService.isConsumerLoggedIn();
  isProviderLoggedIn: boolean = UserStorageService.isProviderLoggedIn();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isConsumerLoggedIn = UserStorageService.isConsumerLoggedIn();
      this.isProviderLoggedIn = UserStorageService.isProviderLoggedIn();
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
