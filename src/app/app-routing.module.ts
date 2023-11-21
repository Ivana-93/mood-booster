import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivateGuard } from './auth-guard.service';
import { MoodHistoryComponent } from './mood-history/mood-history.component';
import { DiaryComponent } from './diary/diary.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'moodhistory', component: MoodHistoryComponent, canActivate: [canActivateGuard] },
  { path: 'diary', component: DiaryComponent , canActivate: [canActivateGuard] },
  {path: 'home', component:HomeComponent, canActivate: [canActivateGuard]},
  { path: '', component: HomeComponent, canActivate: [canActivateGuard] },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

