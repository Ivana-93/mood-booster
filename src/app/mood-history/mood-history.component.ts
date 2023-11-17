import { Component, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MoodResultData } from '../model/questionData/moodResult.model';

@Component({
  selector: 'mood-history',
  templateUrl: './mood-history.component.html',
  styleUrls: ['./mood-history.component.css']
})
export class MoodHistoryComponent {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      { title: "Neki tekst", start: new Date() }
    ]
  };



}
