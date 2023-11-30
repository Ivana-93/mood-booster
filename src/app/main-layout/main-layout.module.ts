import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivityComponent } from '../activity/activity.component';
import { DiaryComponent } from '../diary/diary.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { JokesComponent } from '../jokes/jokes.component';
import { MoodHistoryComponent } from '../mood-history/mood-history.component';
import { MoodQuizComponent } from '../mood-quiz/mood-quiz.component';
import { QuestionComponent } from '../mood-quiz/question/question.component';
import { QuotesComponent } from '../quotes/quotes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { MainLayoutComponent } from './main-layout.component';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
MainLayoutComponent,
    JokesComponent,
    HeaderComponent,
    QuotesComponent,
    MoodQuizComponent,
    QuestionComponent,
    ActivityComponent,
    MoodHistoryComponent,
    DiaryComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MainLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    MessagesModule,
    MessageModule,
    DividerModule,
    CardModule,
    InputTextModule,
    PanelModule,
    TabMenuModule,
    RadioButtonModule,
    CalendarModule,
    FullCalendarModule,
    InputTextareaModule,
    FieldsetModule,
    TabViewModule,
    DataViewModule,
    ConfirmDialogModule,
    DialogModule,
    ConfirmPopupModule,
    ToastModule

  ],
  exports:[
    JokesComponent,
    HeaderComponent,
    QuotesComponent,
    MoodQuizComponent,
    QuestionComponent,
    ActivityComponent,
    MoodHistoryComponent,
    DiaryComponent,
    HomeComponent,
    MainLayoutComponent,
  ]
})
export class MainLayoutModule {}
