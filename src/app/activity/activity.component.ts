import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Activity } from '../model/activity.model';
import { SingleResponse } from '../model/responses.model';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {

  constructor(private apiService: ApiService) {}

  activity : string = "";
  isLoading = false;
  buttonLabel = 'FIND ACTIVITY';
  clickCount = 1;

  public getRandomActivity () {
    this.isLoading= true;
    this.clickCount++;
    this.apiService.getRandomActivity().subscribe(
      {
        next: this.handleActivitySucces.bind(this),
        error: this.handleError.bind(this),
      }
    )
    
    }

    handleActivitySucces(responseData: SingleResponse<Activity>): void {  
        this.activity = responseData.data.content
        this.isLoading = false;
        if (this.clickCount > 1) {
          this.buttonLabel = 'SHOW ME MORE';
        }
    }

    handleError(error: Error) {
      console.log(error.message)
    }
  }

