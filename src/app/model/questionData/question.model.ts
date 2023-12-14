import { Answer } from './answer.model';

export class Question {
  questionText: string;
  answers: Answer[];
  id: number;

  constructor(questionText: string, id: number, answers: Answer[]) {
    this.questionText = questionText;
    this.answers = answers;
    this.id = id;
  }
}
