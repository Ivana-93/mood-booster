import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { MoodData } from '../model/moodData.model';

@Component({
  selector: 'mood-history',
  templateUrl: './mood-history.component.html',
  styleUrls: ['./mood-history.component.css'],
})
export class MoodHistoryComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    events: [{ title: 'Neki tekst', start: new Date() }],
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getMoodHistoryCalendar();
  }

  // Method for getting mood history calendar data
  private getMoodHistoryCalendar() {
    this.apiService.getMoodCalendar().subscribe({
      next: this.handleMoodCalendarSuccess.bind(this),
      error: this.handleMoodCalendarError.bind(this),
    });
  }

  // Method for handling mood history calendar data response
  private handleMoodCalendarSuccess(responseData: SingleResponse<MoodData[]>): void {
    this.calendarOptions.events = responseData.data.map((moodData) => {
      return {
        title: moodData.moodTypeResult,
        start: moodData.moodCreated,
      };
    });
  }

  // Method for handling mood history calendar data response error
  private handleMoodCalendarError(error: Error): void {
    console.log(error.message);
  }
}
