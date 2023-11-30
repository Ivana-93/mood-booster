import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { StorageService } from '../storage.service';
import { TabViewChangeEvent } from 'primeng/tabview';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmationService} from 'primeng/api';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedin = true;
  private user: User;
  public userInfo: string;

  public overlayIndex: number = 1;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    if (this.storageService.getAccessToken() === null) {
      this.isLoggedin = false;
    }
    this.user = this.storageService.getUser();
    if (this.user === null || this.user === undefined) {
      this.isLoggedin = false;
    }
    this.userInfo = `${this.user.firstName} ${this.user.lastName}`;
  }

  navigateTo(event: TabViewChangeEvent) {
    this.overlayIndex = 1;
    switch (event.index) {
      case 0:
        this.navigateToHome();
        break;
      case 1:
        this.navigateToQuiz();
        break;
      case 2:
        this.navigateToMoodHistory();
        break;
      case 3:
        this.navigateToDiary();
        break;
    }
  }

  toggleOverlay(event: TabViewChangeEvent, op: OverlayPanel, target) {
    if (event.index == 0) {
      op.show(event.originalEvent, target);
      this.overlayIndex = 0;
    } else {
      op.hide();
      this.overlayIndex = 1;
    }
  }

  handleOnHide(): void {
    this.overlayIndex = 1;
  }

  position = { 'margin-left': '800rem' };

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }

  navigateToMoodHistory() {
    this.router.navigate(['/moodhistory']);
  }

  navigateToDiary() {
    this.router.navigate(['/diary']);
  }

  logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to logout?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storageService.removeAccessToken();
        this.storageService.removeUser();
        this.router.navigate(['/login']);
      },
      reject: () => {},
    });
    
  }
}