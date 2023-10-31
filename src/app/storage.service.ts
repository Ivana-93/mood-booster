import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { JokeData } from './model/joke.model';


@Injectable({ providedIn: 'root' })
export class StorageService {
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public removeUser(): void {
    localStorage.removeItem('user');
  }

}
