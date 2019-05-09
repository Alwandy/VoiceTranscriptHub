import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecordingComponent } from './recording/recording.component';
import { RecordingCreateComponent } from './recording-create/recording-create.component';
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'recording', component: RecordingComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  {path: 'recording/create', component: RecordingCreateComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
  {path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
