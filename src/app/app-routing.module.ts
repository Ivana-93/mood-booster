import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivateGuard } from './auth-guard.service';
import { MoodHistoryComponent } from './mood-history/mood-history.component';
import { DiaryComponent } from './diary/diary.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'diary',
        component: DiaryComponent,
        canActivate: [canActivateGuard],
      },
      {
        path: 'moodhistory',
        component: MoodHistoryComponent,
        canActivate: [canActivateGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [canActivateGuard],
      },
      { path: '**', component: HomeComponent, canActivate: [canActivateGuard] },
    ],
    canActivate: [canActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
