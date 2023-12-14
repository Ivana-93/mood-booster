import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/app/model/questionData/answer.model';
import { Question } from 'src/app/model/questionData/question.model';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() question: Question;

  @Input() questionNumber: number;

  @Output() selectedAnswer = new EventEmitter<Answer>();

  selection: Answer;

  // Handle answer selection
  public handleAnswerSelection(answer: Answer): void {
    this.selectedAnswer.emit(answer);
  }
}
