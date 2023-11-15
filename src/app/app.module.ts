import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';
import { RegisterComponent } from './register/register.component';
import { ButtonModule, ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { StorageService } from './storage.service';
import { JokesComponent } from './jokes/jokes.component';
import { HeaderComponent } from './header/header.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { QuotesComponent } from './quotes/quotes.component';
import { MoodQuizComponent } from './mood-quiz/mood-quiz.component';
import { QuestionComponent } from './mood-quiz/question/question.component';
import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    JokesComponent,
    HeaderComponent,
    QuotesComponent,
    MoodQuizComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
    RadioButtonModule
   
  ],
  exports: [ButtonModule, DropdownModule, OverlayPanelModule, MessagesModule],
  providers: [ApiService, ButtonDirective, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
