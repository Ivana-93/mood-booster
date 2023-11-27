import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { MoodData } from '../model/moodData.model';

@Component({
  selector: 'mood-history',
  templateUrl: './mood-history.component.html',
  styleUrls: ['./mood-history.component.css']
})
export class MoodHistoryComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: "Neki tekst", start: new Date() }
    ]
  };

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getMoodHistoryCalendar()
  }

  getMoodHistoryCalendar() {
    this.apiService.getMoodCalendar().subscribe({
      next: this.handleMoodCalendarResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleMoodCalendarResponse(responseData: SingleResponse<MoodData[]>): void {
    this.calendarOptions.events = responseData.data.map(moodData => {
      return {
        title: moodData.moodTypeResult,
        start: moodData.moodCreated
      }
    })
  }

  private handleError(error: Error): void {
    //confirm("Sorry! Something went wrong!")
    console.log(error.message);
  }
}
