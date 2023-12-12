import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Activity } from '../model/activity.model';
import { SingleResponse } from '../model/responses.model';
import { AnimationBuilder, animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  animations: [
  ]
})


export class ActivityComponent{

  constructor(private apiService: ApiService) {}

  activity: string = '';
  isLoading = false;
  buttonLabel = 'FIND ACTIVITY';
  clickCount = 1;

  public getRandomActivity() {
    this.isLoading = true;
    this.clickCount++;
    this.apiService.getRandomActivity().subscribe({
      next: this.handleActivitySuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleActivitySuccess(responseData: SingleResponse<Activity>): void {
    this.activity = responseData.data.content;
    this.isLoading = false;
    if (this.clickCount > 1) {
      this.buttonLabel = 'SHOW ME MORE';
    }
  }

  handleError(error: Error) {
    console.log(error.message);
  }
}