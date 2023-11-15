import { Question } from "./question.model";

export class Questions {
    questionList : Question[];

    constructor(questions: Question[]) {
        this.questionList = questions;
    }

}