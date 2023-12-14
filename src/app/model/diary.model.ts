export class DiaryData {
  created: string;
  text: string;

  constructor(text: string, date: string) {
    this.text = text;
    this.created = date;
  }

  get dateCreated(): string {
    let date = new Date(Date.parse(this.created));
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
  }
}
