export class MoodData {
    moodCreated: string;
    moodTypeResult: string;

    constructor(moodCreated: string, moodType: string){
        this.moodCreated = moodCreated;
        this.moodTypeResult = moodType;
    }
}