import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';
import { BaseResponse, SingleResponse } from '../model/responses.model';
import { JokeData } from '../model/joke.model';

@Component({
  selector: 'jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

    joke: string = ""
    isLoading = false;
    
  onJokeOfTheDay() {
    this.isLoading = true;
    this.getJoke()
    }


  public getJoke(): void {
    this.apiService.getJoke().subscribe(
      //success
      {
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      }
    );
  }

  private handleSuccess(responseData: SingleResponse<JokeData>): void {
    var jokeData = responseData.data;
    this.joke = jokeData.content;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.log(error.message);
  }
}
