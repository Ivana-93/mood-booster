import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { JokeData } from '../model/joke.model';

@Component({
  selector: 'jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent {
  constructor(private apiService: ApiService) {}

  joke: string = '';
  isLoading = false;

  // Button click handler
  public onJokeOfTheDay() {
    this.isLoading = true;
    this.getJoke();
  }

  // Get joke from API
  private getJoke(): void {
    this.apiService.getJoke().subscribe({
      next: this.handleJokeSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // Handle API response
  private handleJokeSuccess(responseData: SingleResponse<JokeData>): void {
    var jokeData = responseData.data;
    this.joke = jokeData.content;
    this.isLoading = false;
  }

  // Handle API error
  private handleError(error: Error): void {
    console.log(error.message);
  }
}
