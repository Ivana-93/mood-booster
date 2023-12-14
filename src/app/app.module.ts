import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TabMenuModule } from 'primeng/tabmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AuthenticationInterceptor } from './interceptors/auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TriviaComponent } from './trivia/trivia.component';
import { TriviaQuestionComponent } from './trivia/trivia-question/trivia-question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TriviaComponent,
    TriviaQuestionComponent,
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
    OverlayPanelModule,
    MessagesModule,
    MessageModule,
    DividerModule,
    CardModule,
    InputTextModule,
    PanelModule,
    TabMenuModule,
    RadioButtonModule,
    MainLayoutModule,
    ToastModule,
  ],
  exports: [ButtonModule, DropdownModule, OverlayPanelModule, MessagesModule],
  providers: [
    ApiService,
    ButtonDirective,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
