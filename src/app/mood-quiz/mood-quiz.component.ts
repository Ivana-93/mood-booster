import { Component, Input, Output, ViewChild } from '@angular/core';
import { SingleResponse } from '../model/responses.model';
import { ApiService } from '../api.service';
import { Questions } from '../model/questionData/questions.model';
import { Question } from '../model/questionData/question.model';
import { Answer } from '../model/questionData/answer.model';
import { PointsCount } from '../model/questionData/points.model';
import { MoodResultData } from '../model/questionData/moodResult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mood-quiz',
  templateUrl: './mood-quiz.component.html',
  styleUrls: ['./mood-quiz.component.css'],
})
export class MoodQuizComponent {
  questions: Questions = undefined;
  currentQuestion: number = 1;
  isLoading = false;
  count = 0;
  moodText: string;
  moodType: string;
  isFinished = false;
  date = new Date(Date.now())

  constructor(private apiService: ApiService, private router: Router) {}

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
     this.count += selectedAnswer.point;
    
  }

  nextQuestion() {
    this.currentQuestion++;
  }


  private handleMoodQuizResult(responseData: SingleResponse<MoodResultData>): void {
    this.moodType = responseData.data.moodType;
    this.moodText = responseData.data.moodText
    this.isLoading = false;
  }

  showResult() {
    this.isFinished = true;
    this.apiService.postMoodQuizResult(this.count).subscribe({
      next: this.handleMoodQuizResult.bind(this),
      error: this.handleError.bind(this),
    });
  }


  noSaveMood(){
    this.router.navigate(["/"])
  }

  saveMood() {

  }
}
