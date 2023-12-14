export class QuoteData {
  id: number;
  content: string;
  dateCreated: Date;

  constructor(id: number, content: string, date: Date) {
    this.id = id;
    this.content = content;
    this.dateCreated = date;
  }
}
