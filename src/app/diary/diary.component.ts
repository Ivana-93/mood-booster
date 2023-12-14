import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { DiaryData } from '../model/diary.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit {
  value!: string;
  isLoading = false;
  entries: DiaryData[];

  constructor(
    private apiSevice: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getDiaryEntries();
  }

  //Retrieves the diary entries from the API service.
  private getDiaryEntries() {
    this.apiSevice.getDiaryEntries().subscribe({
      next: this.handleDiaryEntriesSuccess.bind(this),
      error: this.handleDiaryEntriesError.bind(this),
    });
  }

  //This method is called when the request to get the diary entries is successful.
  //It maps the response to DiaryData model and sorts the entries by date.
  private handleDiaryEntriesSuccess(response: SingleResponse<DiaryData[]>) {
    this.entries = response.data
      .map((diaryData) => {
        return new DiaryData(diaryData.text, diaryData.created);
      })
      .sort((d1, d2) => {
        if (d1.created < d2.created) {
          return 1;
        } else if (d1.created > d2.created) {
          return -1;
        }
        return 0;
      });
  }

  //This method is called when there is an error with the request to the API.
  private handleDiaryEntriesError(error: Error): void {
    console.log(error.message);
  }

  //This method is called when the user clicks the "SAVE YOUR THOUGHTS" button.
  public onSaveDiary() {
    this.isLoading = true;
    this.apiSevice.updateDiary(this.value).subscribe({
      next: this.handleSaveDiarySuccess.bind(this),
      error: this.handleSaveDiaryError.bind(this),
    });
  }

  //This method is called when saving diary entry is successful.
  //It shows success message, clears the textarea and updates diary entries with new entry.
  private handleSaveDiarySuccess(response: SingleResponse<string>) {
    this.isLoading = false;
    this.show();
    this.clearDiaryEntry();
    this.getDiaryEntries();
  }

  //Method for showing success message
  private show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You have saved your diary!',
      key: 'tc',
    });
  }

  //This method is called when there is an error with saving diary entry.
  private handleSaveDiaryError(error: Error): void {
    console.log(error.message);
    this.noShow();
  }

  //Method for showing warning message
  private noShow() {
    this.messageService.add({
      key: 'tc',
      severity: 'warning',   
      summary: 'Ups!',
      detail: 'Something went wrong with saving!',
    });
  }

  //Method for clearing the textarea
  private clearDiaryEntry() {
    this.value = null;
  }
}
