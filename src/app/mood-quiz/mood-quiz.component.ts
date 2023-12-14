import { Component } from '@angular/core';
import { SingleResponse } from '../model/responses.model';
import { ApiService } from '../api.service';
import { Questions } from '../model/questionData/questions.model';
import { Question } from '../model/questionData/question.model';
import { Answer } from '../model/questionData/answer.model';
import { MoodResultData } from '../model/questionData/moodResult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mood-quiz',
  templateUrl: './mood-quiz.component.html',
  styleUrls: ['./mood-quiz.component.css'],
})
export class MoodQuizComponent {
  isVisible: boolean = false;
  isClicked = false;
  questions: Questions = undefined;
  currentQuestion: number = 1;
  isLoading = false;
  count = 0;
  moodText: string;
  moodType: string;
  isFinished = false;
  date = new Date(Date.now());

  constructor(private apiService: ApiService, private router: Router) {}

  // This method is called when the user clicks the "Start Quiz" button.
  // It sends a request to the API to get the questions for the quiz.
  public getQuestions(): void {
    this.isLoading = true;
    this.apiService.getQuestions().subscribe({
      next: this.handleGetQuestionSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // This method is called when the request to get the questions is successful.
  private handleGetQuestionSuccess(
    responseData: SingleResponse<Questions>
  ): void {
    this.questions = responseData.data;
    this.isLoading = false;
    this.isVisible = true;
  }

  // This method is called when there is an error with the request to the API or any other methods in this component.
  private handleError(error: Error): void {
    console.log(error.message);
    this.isLoading = false;
    this.isVisible = false;
  }

  // This method is called when the user selects an answer to a question.
  // It adds the point value of the selected answer to the count variable.
  public handleAnswerSelected(
    question: Question,
    selectedAnswer: Answer
  ): void {
    this.isClicked = true;
    this.count += selectedAnswer.point;
  }

  // This method is called when the user clicks the "Next" button.
  public nextQuestion() {
    this.currentQuestion++;
    this.isClicked = false;
  }

  // This method is called when the user clicks the "Find out results" button.
  // It sends a request to the API to get the user's mood result based on the count (point values of answers).
  public showResult() {
    this.isFinished = true;
    this.isLoading = true;
    this.apiService.postMoodQuizResult(this.count).subscribe({
      next: this.handleMoodQuizResultSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // This method is called when the request to get the user's mood result is successful.
  // It sets the moodText and moodType variables to the values returned from the API.
  private handleMoodQuizResultSuccess(
    responseData: SingleResponse<MoodResultData>
  ): void {
    this.moodType = responseData.data.moodType;
    this.moodText = responseData.data.moodText;
    this.isLoading = false;
  }

  // This method is called when the user chooses not to save their mood after finishing the quiz.
  // It resets the quiz and navigates the user back to the home page.
  public noSaveMood() {
    this.resetQuiz();
    //this.router.navigate(['/']);
  }

  // This method is called when the user chooses to save their mood after finishing the quiz.
  // It sends a request to the API to update the user's mood history with their current mood.
  public saveMood() {
    this.apiService.updateMoodHistoryData(this.moodType).subscribe({
      next: this.handleSaveMoodSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // This method is called when the request to update the user's mood history is successful.
  // It resets the quiz, and navigates the user back to the home page.
  private handleSaveMoodSuccess(
    responseData: SingleResponse<MoodResultData>
  ): void {
    this.resetQuiz();
    //this.router.navigate(['/']);
  }

  // Reset the necessary variables to their initial state
  public resetQuiz(): void {
    this.currentQuestion = 1;
    this.count = 0;
    this.questions = null;
    this.moodText = null;
    this.moodType = null;
    this.isVisible = false;
    this.isFinished = false;
  }
}
