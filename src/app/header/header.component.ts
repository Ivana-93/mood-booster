import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {
  isLoggedin = true;
  private user: User;
  public userInfo: string;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    if (this.storageService.getToken() === null) {
      this.isLoggedin = false;
    }
     this.user = this.storageService.getUser();
     if (this.user === null || this.user === undefined){
        this.isLoggedin = false;
     }
     this.userInfo=`${this.user.firstName} ${this.user.lastName}`
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }

  navigateToMoodHistory() {
    this.router.navigate(['/moodhistory']);
  }

  navigateToDairy() {
    this.router.navigate(['/dairy']);
  }


  logout() {
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
      this.storageService.removeToken();
      this.storageService.removeUser();
      this.router.navigate(['/login']);
    }
    this.isLoggedin = false;
   
  }



    }

