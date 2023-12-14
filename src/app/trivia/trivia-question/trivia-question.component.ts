import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TriviaQuestion } from 'src/app/model/Trivia/questionTrivia.model';

@Component({
  selector: 'trivia-question',
  templateUrl: './trivia-question.component.html',
  styleUrls: ['./trivia-question.component.css'],
})
export class TriviaQuestionComponent {
  selection: string;

  shuffledAnswers = [];

  @Input() public question: TriviaQuestion;

  @Output() private selectedAnswer: EventEmitter<any> = new EventEmitter();

  public handleSelectedAnswer(answer: string): void {
    this.selectedAnswer.emit(answer);
    this.shuffledAnswers = [];
  }

  // Shuffle method
  shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
  }

  // Combine correct and incorrect answers for radio button options using spread operator and shuffle
  get allAnswers(): string[] {
    if (this.shuffledAnswers.length == 0) {
      this.shuffledAnswers = this.shuffle([
        this.question.correct_answer,
        ...this.question.incorrect_answers,
      ]);
    }
    return this.shuffledAnswers;
  }
}
