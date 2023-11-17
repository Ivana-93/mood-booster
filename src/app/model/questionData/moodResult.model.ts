export class MoodResultData {
    moodType: string;
    moodText: string;

    constructor (moodType: string, moodText: string){
        this.moodText = moodText;
        this.moodType = moodType;
    }
}