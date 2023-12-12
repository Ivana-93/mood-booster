import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ErrorResponse, SingleResponse } from '../model/responses.model';
import { TriviaQuestion } from '../model/Trivia/questionTrivia.model';

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
  isFinished= false;

  constructor(private apiService: ApiService) {}

  handleSelectedAnswer(event: string) {
    this.currentQuestionIndex++;
    if (event == this.currentQuestion.correct_answer){
      this.points +=1;
    }
    this.updateCurrentQuestion();
  }

  getTriviaQuestions(): void {
    this.isLoading = true;
    this.apiService.getTriviaQuestions().subscribe({
      next: this.handleTriviaQuestionsSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleTriviaQuestionsSuccess(responseData: SingleResponse<TriviaQuestion[]>) {
    this.triviaQuestions = responseData.data;
    this.isLoading = false;
    this.updateCurrentQuestion();
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.triviaQuestions[this.currentQuestionIndex];
  }

  handleError(error: ErrorResponse): void {
    console.log(error.message);
  }

  playTriviaAgain() {
   this.isLoading = false;
   this.triviaQuestions = [];
   this.currentQuestionIndex = 0;
   this.currentAnswers = [];
   this.points = 0;
   this.isFinished= false;
   this.getTriviaQuestions()
  }

}
