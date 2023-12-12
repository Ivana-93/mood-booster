import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { DiaryData } from '../model/diary.model';

@Component({
  selector: 'diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css'],
})
export class DiaryComponent implements OnInit {
  value!: string;
  isLoading = false;
  entries: DiaryData[];

  constructor(private apiSevice: ApiService) {}

  ngOnInit() {
    this.getDiaryEntries();
  }

  getDiaryEntries() {
    this.apiSevice.getDiaryEntries().subscribe({
      next: this.handleDiaryEntries.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleDiaryEntries(response: SingleResponse<DiaryData[]>) {
    this.entries = response.data.map((diaryData) => {
      return new DiaryData(diaryData.text, diaryData.created);
    });
  }

  onSaveDairy() {
    this.isLoading = true;
    this.apiSevice.updateDiary(this.value).subscribe({
      next: this.handleNewEntry.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleNewEntry(response: SingleResponse<string>) {
    this.isLoading = false;
  }

  handleError(error: Error): void {
    console.log(error.message)
  }
}