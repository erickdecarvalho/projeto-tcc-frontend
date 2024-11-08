import { Injectable } from '@angular/core';
const TOKEN = 's_token';
const USER = 's_user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  constructor() { }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static getToken(): string {
    return localStorage.getItem(TOKEN) || '';
  }
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
  static getUserId(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.userId;
  }
  static getUserEmail(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.useremail;
  }
  static getUserRole(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.role;
  }
  static isConsumerLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CONSUMER';
  }
  static isProviderLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'PROVIDER';
  }
  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
