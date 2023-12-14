import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ErrorResponse, SingleResponse } from '../model/responses.model';
import { TriviaQuestion } from '../model/Trivia/questionTrivia.model';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent {
  isLoading = false;
  triviaQuestions: TriviaQuestion[];
  currentQuestion: TriviaQuestion;
  currentQuestionIndex: number = 0;
  currentAnswers: [];
  points: number = 0;
  isFinished = false;

  constructor(private apiService: ApiService) {}

  //Handles the selected answer event.
  //Increments the current question index, updates the points if the selected answer is correct and updates the current question.
  public handleSelectedAnswer(event: string) {
    this.currentQuestionIndex++;
    if (event == this.currentQuestion.correct_answer) {
      this.points += 1;
    }
    this.updateCurrentQuestion();
  }

  // This method is called when the user clicks the "Start Quiz" button-calls the api service to get the trivia questions.
  public getTriviaQuestions(): void {
    this.isLoading = true;
    this.apiService.getTriviaQuestions().subscribe({
      next: this.handleTriviaQuestionsSuccess.bind(this),
      error: this.handleTriviaQuestionsError.bind(this),
    });
  }

  // Method for handling trivia questions response
  private handleTriviaQuestionsSuccess(
    responseData: SingleResponse<TriviaQuestion[]>
  ) {
    this.triviaQuestions = responseData.data;
    this.isLoading = false;
    this.updateCurrentQuestion();
  }

  // Method for updating the current question
  private updateCurrentQuestion() {
    this.currentQuestion = this.triviaQuestions[this.currentQuestionIndex];
  }

  // Method for handling response error
  private handleTriviaQuestionsError(error: ErrorResponse): void {
    console.log(error.message);
    // Check if the error message is specific
    if (error.status === HttpStatusCode.BadGateway) {
      this.getTriviaQuestions();
    }
  }

  // Method for clearing the trivia questions and starting the quiz again
  public playTriviaAgain() {
    this.isLoading = false;
    this.triviaQuestions = [];
    this.currentQuestionIndex = 0;
    this.currentAnswers = [];
    this.points = 0;
    this.isFinished = false;
    this.getTriviaQuestions();
  }
}
