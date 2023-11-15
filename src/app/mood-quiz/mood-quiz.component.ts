import { Component, Input, Output, ViewChild } from '@angular/core';
import { SingleResponse } from '../model/responses.model';
import { ApiService } from '../api.service';
import { Questions } from '../model/questionData/questions.model';
import { Question } from '../model/questionData/question.model';
import { Answer } from '../model/questionData/answer.model';

@Component({
  selector: 'mood-quiz',
  templateUrl: './mood-quiz.component.html',
  styleUrls: ['./mood-quiz.component.css'],
})
export class MoodQuizComponent {
  questions: Questions = undefined;
  currentQuestion: number = 1;
  isLoading = false;

  constructor(private apiService: ApiService) {}

  public getQuestions(): void {
    this.isLoading = true;
    this.apiService.getQuestions().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(responseData: SingleResponse<Questions>): void {
    this.questions = responseData.data;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.log(error.message);
    this.isLoading = false;
  }

  public handleAnswerSelected(question:  Question, selectedAnswer: Answer): void {
    confirm(`You selected ${selectedAnswer.answerText}`);
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  showResult() {
    
  }
}
