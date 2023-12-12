export class TriviaQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];

    constructor( q: string, ca: string, ia: string[]) 
    {   this.question = q;
        this.correct_answer = ca;
        this.incorrect_answers = ia;
    }
}